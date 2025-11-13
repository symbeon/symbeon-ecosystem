import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Bot,
  Star,
  Download,
  Play,
  Code,
  Users,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import { useState } from 'react'
import LoginModal from '../components/LoginModal'

// Mock data - em produção viria de API
const agentData = {
  '1': {
    id: '1',
    name: 'Assistente Ético de Saúde',
    description:
      'Agente especializado em análise de dados médicos com validação ética completa. Garante privacidade, conformidade LGPD e detecção de vieses em diagnósticos assistidos por IA.',
    creator: 'Symbeon Labs',
    category: 'Saúde',
    modules: ['SEVE-Core', 'SEVE-Ethics', 'Empathy Engine'],
    price: 0,
    rating: 4.9,
    downloads: 1250,
    reviews: 89,
    tags: ['saúde', 'médico', 'ética', 'lgpd'],
    createdAt: '2024-01-15',
    version: '1.2.0',
    features: [
      'Análise de dados médicos com privacidade',
      'Validação ética automática',
      'Detecção de vieses em diagnósticos',
      'Conformidade LGPD/GDPR',
      'Relatórios auditáveis',
    ],
    useCases: [
      'Análise de exames médicos',
      'Suporte a diagnósticos',
      'Triagem inteligente',
      'Pesquisa médica ética',
    ],
    reviewsList: [
      {
        user: 'Dr. Maria Silva',
        rating: 5,
        comment: 'Excelente ferramenta para análise ética de dados médicos.',
        date: '2024-11-01',
      },
      {
        user: 'Hospital Central',
        rating: 5,
        comment: 'Implementação simples e validação robusta.',
        date: '2024-10-28',
      },
    ],
  },
}

export default function AgentDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'code'>('overview')

  const agent = agentData[id as keyof typeof agentData]

  if (!agent) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-slate-400 mb-4">Agente não encontrado</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="px-6 py-3 bg-gradient-accent text-white rounded-lg font-semibold"
          >
            Voltar ao Marketplace
          </button>
        </div>
      </div>
    )
  }

  const handleDownload = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true)
      return
    }
    // Lógica de download
    alert('Download iniciado!')
  }

  const handleTest = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true)
      return
    }
    // Lógica de teste
    alert('Abrindo ambiente de teste...')
  }

  return (
    <div className="pt-16 min-h-screen">
      <section className="section">
        <div className="container max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/marketplace')}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Voltar ao Marketplace
            </button>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center">
                    <Bot className="text-white" size={40} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-gradient mb-2">{agent.name}</h1>
                    <div className="flex items-center gap-4 text-slate-400">
                      <span className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={18} />
                        {agent.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download size={18} />
                        {agent.downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={18} />
                        {agent.reviews}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-slate-300 mb-6 leading-relaxed">{agent.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-bg-secondary border border-slate-700 rounded-lg text-sm text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Módulos */}
                <div className="mb-6">
                  <div className="text-sm text-slate-400 mb-2">Módulos SEVE Utilizados:</div>
                  <div className="flex flex-wrap gap-2">
                    {agent.modules.map((module) => (
                      <span
                        key={module}
                        className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-lg text-sm text-purple-300"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:w-80 space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-bg-card rounded-2xl border border-slate-800 p-6"
                >
                  <div className="text-3xl font-black text-gradient mb-2">
                    {agent.price === 0 ? 'Grátis' : `R$ ${agent.price}`}
                  </div>
                  <div className="space-y-3 mt-6">
                    <motion.button
                      onClick={handleDownload}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-gradient-accent text-white rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      Baixar Agente
                    </motion.button>
                    <motion.button
                      onClick={handleTest}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-bg-secondary border border-slate-700 text-slate-200 rounded-lg font-semibold flex items-center justify-center gap-2 hover:border-purple-500/50 transition-colors"
                    >
                      <Play size={20} />
                      Testar Agora
                    </motion.button>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-800 text-sm text-slate-400 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Criado por</span>
                      <span className="text-slate-200">{agent.creator}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Versão</span>
                      <span className="text-slate-200">{agent.version}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Lançado em</span>
                      <span className="text-slate-200">{agent.createdAt}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="mb-8 border-b border-slate-800">
            <div className="flex gap-4">
              {[
                { id: 'overview', label: 'Visão Geral', icon: Bot },
                { id: 'reviews', label: 'Avaliações', icon: Star },
                { id: 'code', label: 'Código', icon: Code },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-3 border-b-2 transition-colors flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-bg-card rounded-3xl border border-slate-800 p-8"
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-200">Funcionalidades</h3>
                  <ul className="space-y-3">
                    {agent.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-200">Casos de Uso</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agent.useCases.map((useCase, i) => (
                      <div
                        key={i}
                        className="p-4 bg-bg-secondary border border-slate-700 rounded-xl"
                      >
                        <p className="text-slate-300">{useCase}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {agent.reviewsList.map((review, i) => (
                  <div key={i} className="border-b border-slate-800 pb-6 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-slate-200 mb-1">{review.user}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              size={16}
                              className={
                                j < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-slate-600'
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-slate-500">{review.date}</span>
                    </div>
                    <p className="text-slate-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'code' && (
              <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-200">Exemplo de Uso</h3>
                <pre className="bg-bg-secondary rounded-xl p-6 overflow-x-auto">
                  <code className="text-slate-300 text-sm">
{`import { SEVEAgent } from '@symbeon/seve-framework'

const healthAgent = new SEVEAgent({
  modules: ['SEVE-Core', 'SEVE-Ethics', 'Empathy Engine'],
  config: {
    ethicalValidation: true,
    privacyMode: 'strict',
    lgpdCompliant: true
  }
})

// Usar o agente
const result = await healthAgent.analyze(medicalData)`}
                  </code>
                </pre>
              </div>
            )}
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

