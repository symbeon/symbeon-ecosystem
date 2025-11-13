/**
 * Analytics Utility
 * Integração com Google Analytics 4 e event tracking
 */

// Google Analytics 4 Measurement ID
// Substitua pelo seu ID real quando configurar
const GA_MEASUREMENT_ID = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID || ''

// Verificar se está em produção
const isProduction = (import.meta as any).env?.PROD || false

/**
 * Inicializa Google Analytics
 */
export function initAnalytics() {
  if (!isProduction || !GA_MEASUREMENT_ID) {
    console.log('[Analytics] Desabilitado (dev mode ou GA_ID não configurado)')
    return
  }

  // Carregar script do Google Analytics
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script1)

  // Configurar gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  })

  // Expor gtag globalmente
  ;(window as any).gtag = gtag

  console.log('[Analytics] Google Analytics inicializado')
}

/**
 * Track page view
 */
export function trackPageView(path: string) {
  if (!isProduction || !GA_MEASUREMENT_ID) return

  const gtag = (window as any).gtag
  if (gtag) {
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
    })
  }
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  eventParams?: {
    [key: string]: string | number | boolean
  }
) {
  if (!isProduction || !GA_MEASUREMENT_ID) return

  const gtag = (window as any).gtag
  if (gtag) {
    gtag('event', eventName, eventParams)
  }

  // Log em dev mode
  if (!isProduction) {
    console.log('[Analytics Event]', eventName, eventParams)
  }
}

/**
 * Eventos específicos do showcase
 */
export const AnalyticsEvents = {
  // Onboarding
  onboardingStarted: () => trackEvent('onboarding_started'),
  onboardingCompleted: (profile: {
    role: string
    level: number
    points: number
  }) =>
    trackEvent('onboarding_completed', {
      role: profile.role,
      level: profile.level,
      points: profile.points,
    }),

  // CTA Clicks
  ctaClicked: (ctaName: string, location: string) =>
    trackEvent('cta_clicked', {
      cta_name: ctaName,
      location,
    }),

  // SEVE Diagram
  seveModuleClicked: (moduleName: string) =>
    trackEvent('seve_module_clicked', {
      module_name: moduleName,
    }),

  // Audience Segments
  segmentViewed: (segmentId: string) =>
    trackEvent('segment_viewed', {
      segment_id: segmentId,
    }),

  segmentCtaClicked: (segmentId: string, ctaType: string) =>
    trackEvent('segment_cta_clicked', {
      segment_id: segmentId,
      cta_type: ctaType,
    }),

  // Navigation
  navigationClicked: (linkName: string) =>
    trackEvent('navigation_clicked', {
      link_name: linkName,
    }),

  // Scroll
  scrollDepth: (depth: number) =>
    trackEvent('scroll_depth', {
      depth_percent: depth,
    }),

  // External Links
  externalLinkClicked: (url: string, linkText: string) =>
    trackEvent('external_link_clicked', {
      url,
      link_text: linkText,
    }),
}

// Declaração global para TypeScript
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

