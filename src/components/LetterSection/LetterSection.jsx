import { useState } from 'react'
import useInViewReveal from '../../hooks/useInViewReveal'
import './LetterSection.css'

export default function LetterSection() {
  // ✅ Fondo estático (solo SB07)
  const [bg] = useState('/SB07.jpg')

  const { ref, inView } = useInViewReveal()

  const headlineScript = 'Una nota de'
  const headlineSerif = 'LOS NOVIOS'

  const message =
    'Gracias por acompañarnos en este día tan especial. ' +
    'Nos emociona muchísimo compartir este momento con ustedes. ' +
    'Su presencia hace que todo sea aún más significativo. ' +
    'Que esta celebración esté llena de alegría, amor y recuerdos inolvidables.'

  return (
    <section className="letter" id="carta">
      <div
        className="letter__bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />

      {/* Reveal wrapper */}
      <div
        ref={ref}
        className={`letter__reveal ${inView ? 'isIn' : ''}`}
      >
        <div className="letter__card">
          <div className="letter__script">{headlineScript}</div>
          <div className="letter__title">{headlineSerif}</div>
          <div className="letter__rule" />
          <p className="letter__text">{message}</p>
          <div className="letter__sign">Atte, Benjamín y Stephanie</div>
        </div>
      </div>
    </section>
  )
}