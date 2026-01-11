import { useEffect, useMemo, useRef, useState } from "react";
import "./PhotosPage.css";

export default function PhotosPage() {
  // ✅ Cambia/ordena tus fotos aquí
  const photos = useMemo(
    () => [
      "/photos/1.jpg",
      "/photos/2.jpg",
      "/photos/3.jpg",
      "/photos/4.jpg",
      "/photos/5.jpg",
      "/photos/6.jpg",
      "/photos/7.jpg",
      "/photos/8.jpg",
      "/photos/9.jpg",
    ],
    []
  );

  const trackRef = useRef(null);

  // slider index
  const [index, setIndex] = useState(0);

  // fullscreen viewer
  const [viewerOpen, setViewerOpen] = useState(false);

  // zoom / pan state
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const viewerRef = useRef(null);

  // pointers (for pinch)
  const pointersRef = useRef(new Map()); // id -> {x,y}
  const pinchRef = useRef({
    startDist: 0,
    startScale: 1,
    startPan: { x: 0, y: 0 },
  });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const scrollToIndex = (i, behavior = "smooth") => {
    const el = trackRef.current;
    if (!el) return;
    const next = clamp(i, 0, photos.length - 1);

    const slide = el.querySelector(`[data-slide="${next}"]`);
    if (slide) {
      slide.scrollIntoView({ behavior, block: "nearest", inline: "center" });
      setIndex(next);
    }
  };

  const next = () => scrollToIndex(index + 1);
  const prev = () => scrollToIndex(index - 1);

  // ✅ Actualiza índice al hacer swipe/scroll manual
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slides = Array.from(el.querySelectorAll(".photos__slide"));
        let best = 0;
        let bestDist = Infinity;

        slides.forEach((s, i) => {
          const rect = s.getBoundingClientRect();
          const sCenter = rect.left + rect.width / 2;
          const dist = Math.abs(sCenter - window.innerWidth / 2);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });

        setIndex(best);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ✅ Teclado (desktop) + viewer controls
  useEffect(() => {
    const onKey = (e) => {
      if (viewerOpen) {
        if (e.key === "Escape") setViewerOpen(false);
        if (e.key === "+" || e.key === "=") zoomBy(1.15);
        if (e.key === "-" || e.key === "_") zoomBy(1 / 1.15);
        return;
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, viewerOpen]);

  // lock body scroll when viewer open
  useEffect(() => {
    if (!viewerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [viewerOpen]);

  const openViewer = () => {
    setViewerOpen(true);
    setScale(1);
    setPan({ x: 0, y: 0 });
    pointersRef.current.clear();
    dragRef.current.dragging = false;
  };

  const closeViewer = () => {
    setViewerOpen(false);
    pointersRef.current.clear();
    dragRef.current.dragging = false;
  };

  const zoomTo = (s) => setScale(clamp(s, 1, 5));
  const zoomBy = (factor) => setScale((s) => clamp(s * factor, 1, 5));
  const resetView = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  // wheel zoom (desktop)
  const onWheelViewer = (e) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const factor = delta > 0 ? 1.08 : 1 / 1.08;
    zoomBy(factor);
  };

  // pointer handlers (pan + pinch)
  const onPointerDown = (e) => {
    const el = viewerRef.current;
    if (!el) return;
    el.setPointerCapture?.(e.pointerId);

    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 1) {
      dragRef.current.dragging = true;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
    }

    if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values());
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      pinchRef.current.startDist = Math.hypot(dx, dy);
      pinchRef.current.startScale = scale;
      pinchRef.current.startPan = { ...pan };
      dragRef.current.dragging = false;
    }
  };

  const onPointerMove = (e) => {
    if (!viewerOpen) return;

    const map = pointersRef.current;
    if (!map.has(e.pointerId)) return;

    map.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (map.size === 2) {
      const pts = Array.from(map.values());
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      const dist = Math.hypot(dx, dy);
      const startDist = pinchRef.current.startDist || dist;

      const raw =
        (pinchRef.current.startScale || scale) * (dist / startDist);
      const nextScale = clamp(raw, 1, 5);
      setScale(nextScale);
      return;
    }

    if (map.size === 1 && dragRef.current.dragging) {
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;

      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;

      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    }
  };

  const onPointerUp = (e) => {
    const map = pointersRef.current;
    map.delete(e.pointerId);

    if (map.size === 0) {
      dragRef.current.dragging = false;
      pinchRef.current.startDist = 0;
    }

    if (map.size === 1) {
      const pt = Array.from(map.values())[0];
      dragRef.current.dragging = true;
      dragRef.current.lastX = pt.x;
      dragRef.current.lastY = pt.y;
    }
  };

  // double click/tap to toggle zoom
  const onDoubleClickViewer = () => {
    if (scale === 1) zoomTo(2);
    else resetView();
  };

  return (
    <section className="photos" id="fotos" aria-label="Galería de fotos">
      <div className="photos__bg" aria-hidden="true" />

      <header className="photos__head">
        <div className="photos__title">B&amp;S</div>
        <div className="photos__sub">Desliza para ver las fotos con calma</div>
      </header>

      <div className="photos__frame">
        {/* ✅ Track */}
        <div className="photos__track" ref={trackRef}>
          {photos.map((src, i) => (
            <figure
              key={src}
              className="photos__slide"
              data-slide={i}
              aria-label={`Foto ${i + 1} de ${photos.length}`}
            >
              <img
                className="photos__img"
                src={src}
                alt={`B&S ${i + 1}`}
                loading="lazy"
                draggable="false"
              />
            </figure>
          ))}
        </div>

        {/* ✅ BOTÓN FIJO EN ESQUINA INFERIOR DERECHA (SIEMPRE VISIBLE) */}
        <button
          className="photos__expand photos__expand--corner"
          type="button"
          onClick={openViewer}
          aria-label="Ver en pantalla completa"
          title="Pantalla completa"
        >
          ⤢
        </button>

        {/* Controles */}
        <button
          className="photos__nav photos__nav--prev"
          onClick={prev}
          aria-label="Foto anterior"
          type="button"
        >
          ‹
        </button>

        <button
          className="photos__nav photos__nav--next"
          onClick={next}
          aria-label="Siguiente foto"
          type="button"
        >
          ›
        </button>

        {/* Dots */}
        <div className="photos__dots" role="tablist" aria-label="Selector de foto">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`photos__dot ${i === index ? "isActive" : ""}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir a foto ${i + 1}`}
              aria-selected={i === index}
              role="tab"
              type="button"
            />
          ))}
        </div>

        {/* ✅ contador arriba derecha */}
        <div className="photos__topRight" aria-hidden="false">
          <div className="photos__counter" aria-hidden="true">
            {index + 1} / {photos.length}
          </div>
        </div>
      </div>

      {/* ===========================
          FULLSCREEN VIEWER
      ============================ */}
      {viewerOpen && (
        <div
          className="photos__viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de foto en pantalla completa"
          onClick={(e) => {
            if (e.target.classList.contains("photos__viewer")) closeViewer();
          }}
        >
          <div className="photos__viewerTop">
            <div className="photos__viewerTitle">B&amp;S</div>

            <div className="photos__viewerActions">
              <button
                className="photos__viewerBtn"
                type="button"
                onClick={() => zoomBy(1 / 1.15)}
                aria-label="Alejar"
                title="Alejar"
              >
                −
              </button>
              <button
                className="photos__viewerBtn"
                type="button"
                onClick={() => zoomBy(1.15)}
                aria-label="Acercar"
                title="Acercar"
              >
                +
              </button>
              <button
                className="photos__viewerBtn"
                type="button"
                onClick={resetView}
                aria-label="Restablecer"
                title="Restablecer"
              >
                ⟲
              </button>
              <button
                className="photos__viewerClose"
                type="button"
                onClick={closeViewer}
                aria-label="Cerrar"
                title="Cerrar"
              >
                ✕
              </button>
            </div>
          </div>

          <div
            className="photos__viewerStage"
            ref={viewerRef}
            onWheel={onWheelViewer}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={onDoubleClickViewer}
          >
            <img
              className="photos__viewerImg"
              src={photos[index]}
              alt={`B&S fullscreen ${index + 1}`}
              draggable="false"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              }}
            />
          </div>

          <div className="photos__viewerHint" aria-hidden="true">
            Arrastra para mover • Pellizca para zoom • Wheel para zoom • Doble click para alternar
          </div>
        </div>
      )}
    </section>
  );
}