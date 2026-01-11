import useInViewReveal from '../../hooks/useInViewReveal.js'
import './GiftPage.css'

function IconGift() {
  return (
    <svg className="gftIcon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M12 28h40v26a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V28Z" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M10 28h44v-8a4 4 0 0 0-4-4H14a4 4 0 0 0-4 4v8Z" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M32 16v44" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M32 20c0-6 4-10 10-10 2.8 0 4.8 1.6 4.8 4 0 5.6-8.2 6-14.8 6Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M32 20c0-6-4-10-10-10-2.8 0-4.8 1.6-4.8 4 0 5.6 8.2 6 14.8 6Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  )
}

export default function GiftPage() {
  // ✅ Fondo estático
  const bg = '/SB15.jpg'

  const { ref, inView } = useInViewReveal({
    threshold: 0.22,
    rootMargin: '0px 0px -12% 0px',
  })

  const p1 =
    'Por cuestiones prácticas, ya contamos con lo necesario para nuestro hogar, por lo que respetuosamente hemos decidido no contar con mesa de regalos.'
  const p2 =
    'Si desean obsequiarnos algo, lo recibiremos con mucho agradecimiento y cariño.'
  const p3 =
    'El día del evento habrá un espacio destinado para recibir su regalo en efectivo, transferencia o depósito, así como para dejar una dedicatoria para los novios.'

  return (
    <section className={`gift ${inView ? 'isIn' : ''}`} id="regalos">
      <div
        className="gift__bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      <div className="gift__veil" aria-hidden="true" />

      <div ref={ref} className="gift__reveal">
        <article className="gift__paper">
          <header className="gift__head">
            <div className="gift__script">Regalo</div>

            <div className="gift__iconRow" aria-hidden="true">
              <IconGift />
            </div>

            <div className="gift__rule" />
          </header>

          <div className="gift__text">
            <p className="gift__p" style={{ ['--d']: '0ms' }}>{p1}</p>
            <p className="gift__p" style={{ ['--d']: '120ms' }}>{p2}</p>
            <p
              className="gift__p gift__p--highlight"
              style={{ ['--d']: '240ms' }}
            >
              {p3}
            </p>
          </div>

          {/* ✅ Eliminado: sección de bancos / depósitos */}
        </article>
      </div>
    </section>
  )
}