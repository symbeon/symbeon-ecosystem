/**
 * Hook para detectar velocidade do scroll
 * Permite reagir dinamicamente ao movimento do usuário
 */
import { useEffect, useRef, useState } from 'react'

interface ScrollVelocity {
  velocity: number
  direction: 'up' | 'down' | 'idle'
  isScrolling: boolean
}

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState<ScrollVelocity>({
    velocity: 0,
    direction: 'idle',
    isScrolling: false
  })
  
  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(Date.now())
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const currentTime = Date.now()
      const timeDelta = Math.max(currentTime - lastTimeRef.current, 1)
      const scrollDelta = currentScroll - lastScrollRef.current

      // Calcular velocidade (pixels por ms)
      const currentVelocity = Math.abs(scrollDelta / timeDelta)

      setVelocity({
        velocity: currentVelocity,
        direction: scrollDelta > 0 ? 'down' : scrollDelta < 0 ? 'up' : 'idle',
        isScrolling: true
      })

      lastScrollRef.current = currentScroll
      lastTimeRef.current = currentTime

      // Limpar timeout anterior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Definir como "idle" após 150ms sem scroll
      timeoutRef.current = setTimeout(() => {
        setVelocity(prev => ({
          ...prev,
          isScrolling: false,
          velocity: 0
        }))
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return velocity
}
