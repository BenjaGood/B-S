import { useEffect, useMemo, useState } from 'react'
import useInViewReveal from '../../hooks/useInViewReveal.js'
import './FinalPage.css'

function pad2(n) {
  return String(n).padStart(2, '0')
}

function getCountdownParts(targetDate) {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()

  if (diff <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / (3600 * 24))
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { done: false, days, hours, minutes, seconds }
}

export default function FinalPage() {
  // ✅ Fondo estático
  const bg = '/SB16.jpg'

  const { ref, inView } = useInViewReveal({
    threshold: 0.22,
    rootMargin: '0px 0px -12% 0px',
  })

  // ✅ Target: 21 Feb 2026 @ 17:00 local time
  const target = useMemo(() => new Date(2026, 1, 21, 17, 0, 0), [])
  const [t, setT] = useState(() => getCountdownParts(target))

  useEffect(() => {
    const id = setInterval(() => {
      setT(getCountdownParts(target))
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <section className={`final ${inView ? 'isIn' : ''}`} id="final">
      <div
        className="final__bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      <div className="final__veil" aria-hidden="true" />

      <div ref={ref} className="final__reveal">
        <article className="final__card">
          <div className="final__spark" aria-hidden="true" />

          <div className="final__scriptWrap">
            <div className="final__script">Muchas gracias por reservar</div>
          </div>

          <div className="final__text">
            Esperamos contar con su presencia y compartir juntos este día tan especial.
          </div>

          <div className="final__signature">
            Con cariño, <span>Benjamín &amp; Stephanie</span>
          </div>

          {/* ✅ Countdown */}
          <div className="final__count">
            <div className="final__countLabel">Días para nuestra boda:</div>

            {t.done ? (
              <div className="final__countDone">¡Hoy es el gran día! ✨</div>
            ) : (
              <div className="final__countGrid" role="timer" aria-live="polite">
                <div className="final__unit">
                  <div className="final__num">{t.days}</div>
                  <div className="final__cap">Días</div>
                </div>

                <div className="final__unit">
                  <div className="final__num">{pad2(t.hours)}</div>
                  <div className="final__cap">Horas</div>
                </div>

                <div className="final__unit">
                  <div className="final__num">{pad2(t.minutes)}</div>
                  <div className="final__cap">Min</div>
                </div>

                <div className="final__unit">
                  <div className="final__num">{pad2(t.seconds)}</div>
                  <div className="final__cap">Seg</div>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}