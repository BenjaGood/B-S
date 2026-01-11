import useInViewReveal from '../../hooks/useInViewReveal.js'
import './HotelPage.css'

function IconHotel() {
  return (
    <svg className="locIcon" viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M14 54V16.5c0-1.9 1.6-3.5 3.5-3.5H40c1.9 0 3.5 1.6 3.5 3.5V54"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M43.5 28H50c2 0 3.5 1.6 3.5 3.5V54"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M20 21h6M20 28h6M20 35h6M20 42h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M32 21h5M32 28h5M32 35h5M32 42h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M10 54h44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconPin() {
  return (
    <svg className="locPin" viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M32 58s18-16.6 18-32a18 18 0 1 0-36 0c0 15.4 18 32 18 32Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path
        d="M32 34a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg className="hotelMiniIcon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.5 3.5h2.2c.4 0 .8.3.9.7l.7 2.6c.1.4-.1.9-.5 1.1l-1.5.9a14.3 14.3 0 0 0 5.9 5.9l.9-1.5c.2-.4.7-.6 1.1-.5l2.6.7c.4.1.7.5.7.9v2.2c0 .6-.5 1.1-1.1 1.1C10.3 19.6 4.4 13.7 4.4 4.6c0-.6.5-1.1 1.1-1.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function HotelPage() {
  // ✅ Fondo estático
  const bg = '/SB08.jpg'

  const { ref, inView } = useInViewReveal({
    threshold: 0.25,
    rootMargin: '0px 0px -12% 0px',
  })

  const hotel = {
    title: 'QUINTA GUADALUPE HOTEL BOUTIQUE',
    subtitle: 'Cajititlán, Jalisco',
    href: 'https://maps.app.goo.gl/sszhbu1taQGLt8iu9',
    phoneDisplay: '+52 332 828 8755',
    phoneHref: '+523328288755',
    icon: <IconHotel />,
  }

  return (
    <section className="locPage" id="hotel">
      <div
        className="locPage__bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      <div className="locPage__veil" aria-hidden="true" />

      <div ref={ref} className={`locWrap ${inView ? 'isIn' : ''}`}>
        <header className="locHead">
          <div className="locHead__script">Recomendación Hotel</div>
          <div className="locHead__sub">
            <em></em>
          </div>
        </header>

        <div className="locGrid locGrid--single">
          <article className="locCard" style={{ ['--d']: '0ms' }}>
            <div className="locCard__icon">{hotel.icon}</div>

            <div className="locCard__title locCard__title--hotel">
              Nosotros les recomendamos hospedarse en{' '}
              <span className="hotelStrong">{hotel.title}</span>.
            </div>

            <div className="locCard__meta">
              <IconPin />
              <span>{hotel.subtitle}</span>
            </div>

            <div className="locCard__meta">
              <IconPhone />
              <span>{hotel.phoneDisplay}</span>
            </div>

            <div className="hotelBtns">
              <a
                className="locBtn"
                href={hotel.href}
                target="_blank"
                rel="noreferrer"
              >
                VER EN GOOGLE MAPS
              </a>

              <a
                className="locBtn locBtn--ghost"
                href={`tel:${hotel.phoneHref}`}
              >
                LLAMAR {hotel.phoneDisplay}
              </a>
            </div>
          </article>
        </div>

        <div className="hotelFootNote">
          *Sugerimos reservar con anticipación para asegurar disponibilidad.
        </div>
      </div>
    </section>
  )
}