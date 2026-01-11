import useInViewReveal from '../../hooks/useInViewReveal.js'
import './LocationsPage.css'

function IconCross() {
  return (
    <svg className="locIcon" viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M28 10h8v14h12v8H36v22h-8V32H16v-8h12V10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconTerrace() {
  return (
    <svg className="locIcon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M14 30h36" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M18 30v22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M46 30v22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M14 52h36" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M22 30l10-12 10 12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
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

export default function LocationsPage() {
  // ✅ Fondo estático
  const bg = '/SB19.jpg'

  const { ref, inView } = useInViewReveal({
    threshold: 0.25,
    rootMargin: '0px 0px -12% 0px',
  })

  const church = {
    title: 'BASÍLICA LOS SANTOS REYES',
    subtitle: 'Cajititlán, Jalisco',
    href: 'https://maps.app.goo.gl/3WXKSjVCL7X1swRPA',
    icon: <IconCross />,
  }

  const venue = {
    title: 'LA CASCADA',
    subtitle: 'Cajititlán, Jalisco',
    href: 'https://maps.app.goo.gl/KpcREjxZYxQ5AZQw7',
    icon: <IconTerrace />,
  }

  return (
    <section className="locPage" id="ubicaciones">
      <div
        className="locPage__bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      <div className="locPage__veil" aria-hidden="true" />

      <div ref={ref} className={`locWrap ${inView ? 'isIn' : ''}`}>
        <header className="locHead">
          <div className="locHead__script">Ubicaciones</div>
          <div className="locHead__sub">Cajititlán, Jalisco</div>
        </header>

        <div className="locGrid">
          <article className="locCard" style={{ ['--d']: '0ms' }}>
            <div className="locCard__icon">{church.icon}</div>
            <div className="locCard__title">{church.title}</div>
            <div className="locCard__meta">
              <IconPin />
              <span>{church.subtitle}</span>
            </div>

            <a className="locBtn" href={church.href} target="_blank" rel="noreferrer">
              VER UBICACIÓN
            </a>
          </article>

          <article className="locCard" style={{ ['--d']: '140ms' }}>
            <div className="locCard__icon">{venue.icon}</div>
            <div className="locCard__title">{venue.title}</div>
            <div className="locCard__meta">
              <IconPin />
              <span>{venue.subtitle}</span>
            </div>

            <a className="locBtn" href={venue.href} target="_blank" rel="noreferrer">
              VER UBICACIÓN
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}