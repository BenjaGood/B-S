import { useEffect, useMemo, useRef, useState } from "react";
import "./InvitePosterHero.css";

export default function InvitePosterHero({ intervalMs = 6500 }) {
  /* =====================================================
     SLIDES FIJOS: SOLO SB02 y SB05 (desde /public)
     ===================================================== */
  const list = useMemo(() => ["/SB03.jpg", "/SB05.jpg"], []);

  // ===== Crossfade con dos capas =====
  const [aSrc, setASrc] = useState(list[0]);
  const [bSrc, setBSrc] = useState(list[1] || list[0]);
  const [showB, setShowB] = useState(false);

  const idxRef = useRef(1);
  const showBRef = useRef(false);
  const timerRef = useRef(null);

  // Mantén showBRef sincronizado
  useEffect(() => {
    showBRef.current = showB;
  }, [showB]);

  // ✅ Preload para evitar parpadeo
  useEffect(() => {
    list.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [list]);

  // Inicialización
  useEffect(() => {
    setASrc(list[0]);
    setBSrc(list[1] || list[0]);
    setShowB(false);
    showBRef.current = false;
    idxRef.current = 1;
  }, [list]);

  // Loop del slideshow (alternará entre las 2)
  useEffect(() => {
    if (list.length <= 1) return;

    const tick = () => {
      const nextIndex = (idxRef.current + 1) % list.length;
      const nextSrc = list[nextIndex];

      const isShowingB = showBRef.current;

      if (isShowingB) {
        setASrc(nextSrc);
        requestAnimationFrame(() => setShowB(false));
        showBRef.current = false;
      } else {
        setBSrc(nextSrc);
        requestAnimationFrame(() => setShowB(true));
        showBRef.current = true;
      }

      idxRef.current = nextIndex;
    };

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(tick, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [list, intervalMs]);

  return (
    <section className="poster">
      {/* ===== SLIDESHOW FULLSCREEN ===== */}
      <div className="poster__slides" aria-hidden="true">
        <div
          className={`poster__slide ${showB ? "isHidden" : "isVisible"}`}
          style={{ backgroundImage: `url(${aSrc})` }}
        />
        <div
          className={`poster__slide ${showB ? "isVisible" : "isHidden"}`}
          style={{ backgroundImage: `url(${bSrc})` }}
        />
      </div>

      <div className="poster__shade" aria-hidden="true" />

      {/* ===== CONTENIDO ===== */}
      <header className="poster__top">
        <div className="poster__monogram">B&amp;S</div>
      </header>

      <div className="poster__content">
        <div className="poster__small">JUNTO CON NUESTRAS FAMILIAS</div>

        <div className="poster__names">
          <span>Benjamín</span>
          <span className="poster__amp">&amp;</span>
          <span>Stephanie</span>
        </div>

        <div className="poster__small poster__small--thin">
          TE INVITAMOS A NUESTRA BODA
        </div>

        <div className="poster__rule" />

        <div className="poster__date">
          <div className="poster__month">FEBRERO</div>

          <div className="poster__dateRow">
            <div className="poster__side">
              <span>SÁBADO</span>
            </div>

            <div className="poster__day">21</div>

            <div className="poster__side">
              <span>A LAS 5:00 PM</span>
            </div>
          </div>

          <div className="poster__year">2026</div>
        </div>
      </div>
    </section>
  );
}