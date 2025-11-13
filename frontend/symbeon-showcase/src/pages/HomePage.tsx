import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import GamifiedOnboarding from '../components/GamifiedOnboarding'
import ProfileBadge from '../components/ProfileBadge'
import HowToParticipate from '../components/HowToParticipate'
import Proof from '../components/Proof'
import Manifesto from '../components/Manifesto'
import Vision from '../components/Vision'
import Values from '../components/Values'
import SEVECore from '../components/SEVECore'
import EthicalCertification from '../components/EthicalCertification'
import AIAssistant from '../components/AIAssistant'
import Impact from '../components/Impact'
import CTA from '../components/CTA'

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Listener para evento customizado (apenas quando usuário clicar no botão)
    const handleShowOnboarding = () => {
      setShowOnboarding(true)
    }
    window.addEventListener('show-onboarding', handleShowOnboarding)
    return () => window.removeEventListener('show-onboarding', handleShowOnboarding)
  }, [])

  return (
    <>
      <ProfileBadge />
      {showOnboarding && (
        <GamifiedOnboarding
          onClose={() => setShowOnboarding(false)}
        />
      )}
      <Hero />
      <SEVECore />
      <Proof />
      <Manifesto />
      <Vision />
      <Values />
      <EthicalCertification />
      <AIAssistant />
      <Impact />
      <HowToParticipate />
      <CTA />
    </>
  )
}

