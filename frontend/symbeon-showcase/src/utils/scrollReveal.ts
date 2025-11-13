/**
 * Scroll Reveal Utility - NYO Style
 * Animações suaves e fluidas ao rolar a página
 * Inspirado em: https://nyo.ia.br/
 */

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  delay?: number
  distance?: number
}

const defaultOptions: ScrollRevealOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -80px 0px',
  delay: 0,
  distance: 40,
}

export function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Adicionar delay baseado no data-delay se existir
        const delay = entry.target.getAttribute('data-delay') 
          ? parseInt(entry.target.getAttribute('data-delay') || '0')
          : 0

        setTimeout(() => {
          entry.target.classList.add('revealed')
        }, delay)
      }
    })
  }, observerOptions)

  // Observar todos os elementos com classe scroll-reveal
  const elements = document.querySelectorAll('.scroll-reveal')
  elements.forEach((el) => observer.observe(el))

  return observer
}

export function revealOnScroll(
  element: HTMLElement,
  options?: ScrollRevealOptions
) {
  const config = { ...defaultOptions, ...options }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed')
          }, config.delay || 0)
        }
      })
    },
    {
      threshold: config.threshold,
      rootMargin: config.rootMargin,
    }
  )

  observer.observe(element)
  return observer
}

// Função para adicionar scroll reveal a múltiplos elementos
export function addScrollRevealToElements(
  selector: string,
  options?: ScrollRevealOptions
) {
  const elements = document.querySelectorAll(selector)
  const config = { ...defaultOptions, ...options }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = config.delay ? config.delay + index * 100 : index * 100
          setTimeout(() => {
            entry.target.classList.add('revealed')
          }, delay)
        }
      })
    },
    {
      threshold: config.threshold,
      rootMargin: config.rootMargin,
    }
  )

  elements.forEach((el) => observer.observe(el))
  return observer
}
