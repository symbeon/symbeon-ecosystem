import { Routes, Route } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import { initScrollReveal } from './utils/scrollReveal'

// Lazy-load page routes to improve initial bundle
const HomePage = lazy(() => import('./pages/HomePage'))
const MarketplacePageEnhanced = lazy(() => import('./pages/MarketplacePageEnhanced'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const AgentBuilderPage = lazy(() => import('./pages/AgentBuilderPage'))
const AgentDetailsPage = lazy(() => import('./pages/AgentDetailsPage'))

function App() {
  useEffect(() => {
    // Inicializar scroll reveal após componentes renderizarem
    const timer = setTimeout(() => {
      initScrollReveal()
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary">
      <ScrollProgress color="from-cyan-500 to-purple-500" height={3} />
      <Header />
      <main id="main-content" role="main">
        <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePageEnhanced />} />
            <Route path="/agent/:id" element={<AgentDetailsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/builder" element={<AgentBuilderPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
