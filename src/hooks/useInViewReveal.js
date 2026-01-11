import { useEffect, useRef, useState } from 'react'

export default function useInViewReveal(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect() // reveal solo 1 vez
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
        ...options,
      }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, inView }
}