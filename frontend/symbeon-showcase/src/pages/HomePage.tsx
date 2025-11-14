import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
import { useAuth } from '../contexts/AuthContext'
import { Sparkles, Lock, Zap } from 'lucide-react'

// Seção exclusiva para usuários autenticados
function ExclusiveContentBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative py-16 bg-gradient-to-r from-purple-900/20 via-indigo-900/20 to-cyan-900/20 border-y border-slate-700/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Sparkles className="text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                🎉 Conteúdo Exclusivo Desbloqueado
              </h3>
              <p className="text-sm text-slate-400">
                Agora você tem acesso a guias avançados, roadmap privado e comunidade exclusiva
              </p>
            </div>
          </div>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-cyan-400 text-2xl"
          >
            ✨
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// Cartões de features exclusivas
function AuthenticatedFeatures() {
  const features = [
    {
      icon: Zap,
      title: 'Construtor de Agentes',
      description: 'Crie agentes IA personalizados sem código',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Lock,
      title: 'Dashboard Privado',
      description: 'Gerencie seus agentes e métricas em tempo real',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Sparkles,
      title: 'API de Integração',
      description: 'Integre com seus sistemas existentes',
      color: 'from-cyan-500 to-blue-500'
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-bg-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">
            Seus Recursos Exclusivos
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ferramentas poderosas agora à sua disposição
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-bg-card p-8 rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-6 group-hover:scale-110 transition-transform`}>
                <div className="w-full h-full bg-bg-card rounded-[10px] flex items-center justify-center">
                  <feature.icon className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const { isAuthenticated } = useAuth()

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
      {isAuthenticated && <ExclusiveContentBanner />}
      <SEVECore />
      <Proof />
      <Manifesto />
      <Vision />
      <Values />
      {isAuthenticated && <AuthenticatedFeatures />}
      <EthicalCertification />
      <AIAssistant />
      <Impact />
      <HowToParticipate />
      <CTA />
    </>
  )
}

