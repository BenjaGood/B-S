import useInViewReveal from '../../hooks/useInViewReveal.js'
import './CreditsPage.css'

export default function CreditsPage() {
  const { ref, inView } = useInViewReveal({
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px',
  })

  const aetherialUrl = 'https://www.aetherial.tech'
  const logoSrc = '/public/aetherial.png'

  return (
    <section className="creditsPage" id="credits">
      <div className="creditsStars" aria-hidden="true" />
      <div className="creditsGlow" aria-hidden="true" />

      <div ref={ref} className={`creditsWrap ${inView ? 'isIn' : ''}`}>
        <header className="creditsHead">
          <div className="creditsKicker">DESIGN BY:</div>

          {/* 🔥 HERO LOGO GRANDE */}
          <div className="creditsHeroLogo">
            <span className="creditsRing" />
            <span className="creditsRing creditsRing--b" />
            <span className="creditsRing creditsRing--c" />

            <img
              src={logoSrc}
              alt="Aetherial Technologies"
              className="creditsHeroImg"
            />
          </div>
        </header>

        <article className="creditsCard">
          <div className="creditsBrandRow">
            <img className="creditsMiniLogo" src={logoSrc} alt="" />
            <div>
              <div className="creditsBrandName">AETHERIAL TECHNOLOGIES</div>
              <div className="creditsBrandSub">Digital experiences • 2026</div>
            </div>
          </div>

          <div className="creditsDivider" />

          <div className="creditsGrid">
            <div className="creditsItem">
              <div className="creditsLabel">Backend</div>
              <div className="creditsValue">Benjamin Gutierrez</div>
            </div>

            <div className="creditsItem">
              <div className="creditsLabel">Front-end</div>
              <div className="creditsValue">
                Benjamin Gutierrez and Stephanie Luna
              </div>
            </div>
          </div>

          <a
            className="creditsBtn"
            href={aetherialUrl}
            target="_blank"
            rel="noreferrer"
          >
            Visit Aetherial Webpage
          </a>
        </article>

        <footer className="creditsFooter">
          2026 Copyright Aetherial Technologies ©
        </footer>
      </div>
    </section>
  )
}