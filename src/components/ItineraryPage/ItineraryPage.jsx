import useInViewReveal from "../../hooks/useInViewReveal";
import "./ItineraryPage.css";

export default function ItineraryPage() {
  // ✅ Fondo estático
  const bg = "/SB11.jpg";

  const { ref, inView } = useInViewReveal({
    threshold: 0.28,
    rootMargin: "0px 0px -10% 0px",
  });

  // Íconos desde /public
  const items = [
    {
      time: "5:00 PM",
      title: "CEREMONIA",
      place: "Bacilica Los Santos Reyes, CAJITITLÁN, JALISCO",
      side: "left",
      iconSrc: "/ceremony.png",
    },
    {
      time: "7:00 PM",
      title: "INICIO DE EVENTO",
      place: "Terraza La Cascada, CAJITITLÁN, JALISCO",
      side: "right",
      iconSrc: "/event.png",
    },
    {
      time: "8:00 PM",
      title: "CENA",
      place: "Terraza La Cascada, CAJITITLÁN, JALISCO",
      side: "left",
      iconSrc: "/dinner.png",
    },
    {
      time: "9:40 PM",
      title: "FIESTA",
      place: "Terraza La Cascada, CAJITITLÁN, JALISCO",
      side: "right",
      iconSrc: "/party.png",
    },
  ];

  return (
    <section className="itPage" id="itinerario">
      <div
        className="itPage__bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      <div className="itPage__veil" aria-hidden="true" />

      <div ref={ref} className={`itWrap itFit ${inView ? "isIn" : ""}`}>
        <header className="itHead">
          <div className="itHead__script">The</div>
          <div className="itHead__title">PROGRAM</div>
        </header>

        <div className="itTimeline">
          <div className="itLine" aria-hidden="true" />

          {items.map((it, i) => (
            <div
              key={i}
              className={`itRow itRow--${it.side}`}
              style={{ ["--d"]: `${i * 120}ms` }}
            >
              <div className="itCol itCol--left">
                {it.side === "left" && (
                  <div className="itCard">
                    <div className="itTime">{it.time}</div>
                    <div className="itBlock">
                      <div className="itLabel">{it.title}</div>
                      <div className="itPlace">{it.place}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="itMid" aria-hidden="true">
                <div className="itDot" />
              </div>

              <div className="itCol itCol--right">
                {it.side === "right" && (
                  <div className="itCard">
                    <div className="itTime">{it.time}</div>
                    <div className="itBlock">
                      <div className="itLabel">{it.title}</div>
                      <div className="itPlace">{it.place}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Icono */}
              <div
                className={`itIconWrap itIconWrap--${
                  it.side === "left" ? "right" : "left"
                }`}
                aria-hidden="true"
              >
                <img className="itIcon" src={it.iconSrc} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}