import { useEffect, useState } from 'react'
import './TearIntro.css'

export default function TearIntro({ onDone, durationMs = 1600 }) {
  const [phase, setPhase] = useState('idle') // idle -> crack -> tear -> done

  useEffect(() => {
    const t0 = setTimeout(() => setPhase('crack'), 180)
    const t1 = setTimeout(() => setPhase('tear'), 520)
    const t2 = setTimeout(() => {
      setPhase('done')
      onDone?.()
    }, durationMs)

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2) }
  }, [onDone, durationMs])

  return (
    <div className={`tearIntro tearIntro--${phase}`} aria-hidden="true">
      {/* Mitad izquierda */}
      <div className="tearHalf tearHalf--left">
        <div className="tearPaper">
          <div className="tearEdge tearEdge--right" />
          <div className="tearLight" />
        </div>
      </div>

      {/* Mitad derecha */}
      <div className="tearHalf tearHalf--right">
        <div className="tearPaper">
          <div className="tearEdge tearEdge--left" />
          <div className="tearLight" />
        </div>
      </div>

      {/* Sello dorado al centro */}
      <div className="tearSeal" role="presentation">
        <div className="tearSeal__inner">B&amp;S</div>
      </div>

      {/* Grieta rápida */}
      <div className="tearCrack" />
    </div>
  )
}