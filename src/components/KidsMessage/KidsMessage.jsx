// src/components/KidsMessage/KidsMessage.jsx
import useInViewReveal from '../../hooks/useInViewReveal.js'
import './KidsMessage.css'

function SealBS() {
  return (
    <div className="kidsSeal" aria-hidden="true">
      <div className="kidsSeal__inner">
        <span className="kidsSeal__letters">B&amp;S</span>
      </div>
    </div>
  )
}

export default function KidsMessage() {
  // ✅ Fondo estático
  const bg = '/SB01.jpg'

  const { ref, inView } = useInViewReveal({
    threshold: 0.22,
    rootMargin: '0px 0px -12% 0px',
  })

  const p1 =
    'Porque queremos que disfruten, bailen y no se preocupen por nada, amablemente les pedimos que nuestra celebración sea'
  const p2 = 'solo para adultos'

  return (
    <section className={`kidsMsg ${inView ? 'isIn' : ''}`} id="kids-message">
      <div
        className="kidsMsg__bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      <div className="kidsMsg__veil" aria-hidden="true" />

      <div ref={ref} className="kidsMsg__reveal">
        <article className="kidsMsg__paper">
          <header className="kidsMsg__head">
            <div className="kidsMsg__sealRow">
              <SealBS />
            </div>
            <div className="kidsMsg__rule" />
          </header>

          <div className="kidsMsg__text">
            <p className="kidsMsg__p" style={{ ['--d']: '0ms' }}>
              {p1}
            </p>
            <p
              className="kidsMsg__p kidsMsg__adult"
              style={{ ['--d']: '120ms' }}
            >
              {p2}
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}