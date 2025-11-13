import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Bot, Sparkles, Shield, Zap, ArrowRight, Plus } from 'lucide-react'
import LoginModal from '../components/LoginModal'
import { useState } from 'react'

interface Agent {
  id: string
  name: string
  description: string
  creator: string
  category: string
  modules: string[]
  price: number
  rating: number
  downloads: number
}

const agents: Agent[] = [
  {
    id: '1',
    name: 'Assistente Ético de Saúde',
    description: 'Agente especializado em análise de dados médicos com validação ética completa',
    creator: 'Symbeon Labs',
    category: 'Saúde',
    modules: ['SEVE-Core', 'SEVE-Ethics', 'Empathy Engine'],
    price: 0,
    rating: 4.9,
    downloads: 1250,
  },
  {
    id: '2',
    name: 'Analisador de Sentimentos',
    description: 'Motor de empatia para análise de sentimentos em múltiplos idiomas',
    creator: 'Community',
    category: 'Análise',
    modules: ['Empathy Engine', 'SEVE-Universal'],
    price: 0,
    rating: 4.7,
    downloads: 890,
  },
  {
    id: '3',
    name: 'Validador de Conteúdo',
    description: 'Sistema de validação ética para conteúdo gerado por IA',
    creator: 'Symbeon Labs',
    category: 'Validação',
    modules: ['SEVE-Ethics', 'SEVE-Core'],
    price: 0,
    rating: 4.8,
    downloads: 2100,
  },
]

export default function MarketplacePage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const handleCreateAgent = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true)
      return
    }
    navigate('/builder')
  }

  return (
    <div className="pt-16">
      <section ref={ref} className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-heading"
          >
            <div className="section-label mb-4">//MARKETPLACE</div>
            <h1 className="section-title text-5xl md:text-7xl">
              Marketplace de Agentes IA
            </h1>
            <p className="section-subtitle">
              Crie, compartilhe e descubra agentes de IA éticos construídos com SEVE Framework
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={handleCreateAgent}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-accent text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/20 transition-all flex items-center gap-3"
            >
              <Plus size={24} />
              Criar Novo Agente
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-bg-card rounded-3xl border border-slate-800 p-6 hover:border-purple-500/50 transition-all group cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    setLoginModalOpen(true)
                    return
                  }
                  // Navegar para detalhes do agente
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bot className="text-white" size={32} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gradient">{agent.rating}</div>
                    <div className="text-xs text-slate-400">{agent.downloads} downloads</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-slate-200">{agent.name}</h3>
                <p className="text-slate-400 mb-4 text-sm leading-relaxed">{agent.description}</p>

                <div className="mb-4">
                  <div className="text-xs text-slate-500 mb-2">Módulos SEVE:</div>
                  <div className="flex flex-wrap gap-2">
                    {agent.modules.map((module) => (
                      <span
                        key={module}
                        className="px-2 py-1 bg-bg-secondary border border-slate-700 rounded text-xs text-slate-300"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div>
                    <div className="text-xs text-slate-500">Criado por</div>
                    <div className="text-sm font-semibold text-slate-300">{agent.creator}</div>
                  </div>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Ver detalhes
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-bg-card rounded-2xl border border-slate-800 p-6 text-center">
              <Sparkles className="text-purple-500 mx-auto mb-4" size={32} />
              <h4 className="text-lg font-bold mb-2 text-slate-200">Fácil de Criar</h4>
              <p className="text-sm text-slate-400">
                Interface visual para construir agentes sem código
              </p>
            </div>
            <div className="bg-bg-card rounded-2xl border border-slate-800 p-6 text-center">
              <Shield className="text-indigo-500 mx-auto mb-4" size={32} />
              <h4 className="text-lg font-bold mb-2 text-slate-200">Ético por Padrão</h4>
              <p className="text-sm text-slate-400">
                Todos os agentes validados com SEVE-Ethics
              </p>
            </div>
            <div className="bg-bg-card rounded-2xl border border-slate-800 p-6 text-center">
              <Zap className="text-cyan-500 mx-auto mb-4" size={32} />
              <h4 className="text-lg font-bold mb-2 text-slate-200">Deploy Rápido</h4>
              <p className="text-sm text-slate-400">
                Deploy em minutos com infraestrutura gerenciada
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  )
}

