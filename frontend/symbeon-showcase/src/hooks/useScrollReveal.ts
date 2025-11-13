/**
 * Hook para aplicar scroll reveal em elementos React
 * Integra com o sistema de scroll reveal do design system
 */
import { useEffect, useRef } from 'react'
import { revealOnScroll } from '../utils/scrollReveal'

interface UseScrollRevealOptions {
  direction?: 'up' | 'left' | 'right' | 'scale' | 'fade'
  delay?: number
  threshold?: number
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const elementRef = useRef<HTMLElement>(null)
  const { direction = 'up', delay = 0, threshold = 0.1 } = options

  useEffect(() => {
    if (elementRef.current) {
      // Adicionar classes necessárias
      elementRef.current.classList.add('scroll-reveal')
      elementRef.current.classList.add(`scroll-reveal-${direction}`)
      
      if (delay > 0) {
        elementRef.current.setAttribute('data-delay', delay.toString())
      }

      // Inicializar observer
      revealOnScroll(elementRef.current, {
        threshold,
        delay,
      })
    }
  }, [direction, delay, threshold])

  return elementRef
}

