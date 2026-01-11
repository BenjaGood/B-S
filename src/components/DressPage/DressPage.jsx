// src/components/DressPage/DressPage.jsx
import useInViewReveal from '../../hooks/useInViewReveal.js'
import './DressPage.css'

export default function DressPage() {
  // ✅ Fondo estático
  const bg = '/SB17.jpg'

  const { ref, inView } = useInViewReveal({
    threshold: 0.22,
    rootMargin: '0px 0px -12% 0px',
  })

  return (
    <section className={`dress ${inView ? 'isIn' : ''}`} id="vestimenta">
      <div
        className="dress__bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      <div className="dress__veil" aria-hidden="true" />

      <div ref={ref} className="dress__reveal">
        <article className="dress__paper">
          <header className="dress__head">
            <div className="dress__title">Vestimenta, Riguroso formal:</div>
            <div className="dress__rule" />
          </header>

          <div className="dress__grid">
            {/* HOMBRES */}
            <section className="dress__col">
              <div className="dress__kicker">HOMBRES</div>

              <div className="dress__tile">
                <img
                  className="dress__icon"
                  src="/suitlogo.png"
                  alt="Traje"
                  loading="lazy"
                />
              </div>

              <div className="dress__caption">Traje completo</div>
            </section>

            <div className="dress__divider" aria-hidden="true" />

            {/* MUJERES */}
            <section className="dress__col">
              <div className="dress__kicker">MUJERES</div>

              <div className="dress__tile">
                <img
                  className="dress__icon"
                  src="/dresslogo.png"
                  alt="Vestido largo"
                  loading="lazy"
                />
              </div>

              <div className="dress__caption">Vestido largo</div>
            </section>
          </div>

          <div className="dress__note">
            <span className="dress__noteLabel">Nota:</span> Recuerden llevar abrigo y zapatos cómodos
            para bailar.
          </div>
        </article>
      </div>
    </section>
  )
}