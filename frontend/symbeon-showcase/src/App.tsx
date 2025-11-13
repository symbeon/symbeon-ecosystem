import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MarketplacePageEnhanced from './pages/MarketplacePageEnhanced'
import DashboardPage from './pages/DashboardPage'
import AgentBuilderPage from './pages/AgentBuilderPage'
import AgentDetailsPage from './pages/AgentDetailsPage'
import { initScrollReveal } from './utils/scrollReveal'

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
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePageEnhanced />} />
        <Route path="/agent/:id" element={<AgentDetailsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/builder" element={<AgentBuilderPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
