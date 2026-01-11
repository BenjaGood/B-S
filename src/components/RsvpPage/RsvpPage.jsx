import { useEffect, useState } from 'react'
import useInViewReveal from '../../hooks/useInViewReveal.js'
import './RsvpPage.css'

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScSVLcFcA3qSku9UlT7GSI8-trTlx2HXf1tBfd8F8P7KiH87w/viewform?embedded=true'

function IconCheck() {
  return (
    <svg className="rsvpIcon" viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M22 33l7 7 15-17"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 12h28a6 6 0 0 1 6 6v34a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M24 12v10h16V12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function RsvpPage() {
  // ✅ Fondo estático
  const bg = '/SB13.jpg'

  const { ref, inView } = useInViewReveal({
    threshold: 0.22,
    rootMargin: '0px 0px -12% 0px',
  })

  // Modal
  const [open, setOpen] = useState(false)

  // cerrar con ESC + bloquear scroll cuando esté abierto
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const titleScript = 'Reservación'
  const titleSerif = 'CONFIRMACIÓN DE ASISTENCIA'

  const p1 =
    'Es muy importante que, si no podrás asistir, también lo indiques en el formulario. Cada boleto cuenta, ya que contamos con lugares limitados y esto impacta directamente en la organización de la boda.'
  const p2 = 'PRONTO TE CONTACTARAN PARA CONFIRMAR TU ASISTENCIA.'
  const p3 =
    'Favor de respetar la cantidad de boletos entregados por los novios, recuerda que son personales e intransferibles.'

  return (
    <section className={`rsvp ${inView ? 'isIn' : ''}`} id="reservacion">
      <div
        className="rsvp__bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      <div className="rsvp__veil" aria-hidden="true" />

      <div ref={ref} className="rsvp__reveal">
        <article className="rsvp__paper">
          <header className="rsvp__head">
            <div className="rsvp__script">{titleScript}</div>
            <div className="rsvp__title">{titleSerif}</div>

            <div className="rsvp__iconRow" aria-hidden="true">
              <IconCheck />
            </div>

            <div className="rsvp__rule" />
          </header>

          <div className="rsvp__text">
            <p className="rsvp__p" style={{ ['--d']: '0ms' }}>{p1}</p>
            <p className="rsvp__p" style={{ ['--d']: '120ms' }}>{p2}</p>
            <p className="rsvp__p" style={{ ['--d']: '240ms' }}>{p3}</p>
          </div>

          <div className="rsvp__actions">
            <button className="rsvpBtn" onClick={() => setOpen(true)}>
              Reservar
            </button>
            <div className="rsvp__hint">
              Al abrir, podrás confirmar <strong>si asistirás</strong> o{' '}
              <strong>si no podrás ir</strong>.
            </div>
          </div>
        </article>
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="rsvpModal"
          role="dialog"
          aria-modal="true"
          aria-label="Formulario de reservación"
        >
          <button
            className="rsvpModal__backdrop"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
          />
          <div className="rsvpModal__card">
            <div className="rsvpModal__header">
              <div className="rsvpModal__headerTitle">Reservación</div>
              <button
                className="rsvpModal__close"
                onClick={() => setOpen(false)}
              >
                Cerrar
              </button>
            </div>

            <div className="rsvpModal__body">
              <iframe
                className="rsvpModal__iframe"
                src={FORM_URL}
                title="Google Form Reservación"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
              >
                Cargando…
              </iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}