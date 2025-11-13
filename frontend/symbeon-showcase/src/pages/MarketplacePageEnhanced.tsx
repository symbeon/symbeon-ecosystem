import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Bot,
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  Plus,
  Search,
  Filter,
  Star,
  Play,
  X,
} from 'lucide-react'
import LoginModal from '../components/LoginModal'

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
  reviews: number
  tags: string[]
  previewUrl?: string
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
    reviews: 89,
    tags: ['saúde', 'médico', 'ética', 'lgpd'],
    previewUrl: '/preview/health-assistant',
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
    reviews: 56,
    tags: ['sentimentos', 'análise', 'multilíngue'],
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
    reviews: 142,
    tags: ['validação', 'conteúdo', 'moderação'],
  },
  {
    id: '4',
    name: 'Assistente Educacional',
    description: 'Agente adaptativo para educação personalizada com empatia cultural',
    creator: 'Community',
    category: 'Educação',
    modules: ['SEVE-Universal', 'Empathy Engine', 'SEVE-Core'],
    price: 0,
    rating: 4.6,
    downloads: 650,
    reviews: 34,
    tags: ['educação', 'aprendizado', 'personalização'],
  },
  {
    id: '5',
    name: 'Monitor de IoT Ético',
    description: 'Monitoramento de sensores IoT com privacidade por design',
    creator: 'Symbeon Labs',
    category: 'IoT',
    modules: ['SEVE-Sense', 'SEVE-Ethics', 'SEVE-Link'],
    price: 0,
    rating: 4.9,
    downloads: 980,
    reviews: 67,
    tags: ['iot', 'sensores', 'privacidade'],
  },
  {
    id: '6',
    name: 'Tradutor Cultural',
    description: 'Tradução com adaptação cultural e empatia contextual',
    creator: 'Community',
    category: 'Comunicação',
    modules: ['Empathy Engine', 'SEVE-Universal'],
    price: 0,
    rating: 4.5,
    downloads: 1200,
    reviews: 78,
    tags: ['tradução', 'cultura', 'comunicação'],
  },
]

const categories = ['Todos', 'Saúde', 'Análise', 'Validação', 'Educação', 'IoT', 'Comunicação']
const modules = ['SEVE-Core', 'SEVE-Vision', 'SEVE-Sense', 'SEVE-Ethics', 'SEVE-Link', 'SEVE-Universal', 'Empathy Engine']

export default function MarketplacePageEnhanced() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'reviews'>('rating')
  const [previewAgent, setPreviewAgent] = useState<Agent | null>(null)

  const filteredAgents = useMemo(() => {
    let filtered = [...agents]

    // Busca por texto
    if (searchQuery) {
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filtro por categoria
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter((agent) => agent.category === selectedCategory)
    }

    // Filtro por módulos
    if (selectedModules.length > 0) {
      filtered = filtered.filter((agent) =>
        selectedModules.every((module) => agent.modules.includes(module))
      )
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'downloads':
          return b.downloads - a.downloads
        case 'reviews':
          return b.reviews - a.reviews
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedModules, sortBy])

  const handleCreateAgent = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true)
      return
    }
    navigate('/builder')
  }

  const handleAgentClick = (agent: Agent) => {
    if (!isAuthenticated) {
      setLoginModalOpen(true)
      return
    }
    navigate(`/agent/${agent.id}`)
  }

  const toggleModuleFilter = (module: string) => {
    setSelectedModules((prev) =>
      prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]
    )
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

          {/* Barra de Busca e Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar agentes, tags, descrições..."
                className="w-full pl-12 pr-4 py-3 bg-bg-card border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4">
              {/* Categorias */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter size={18} className="text-slate-400" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-accent text-white'
                        : 'bg-bg-card border border-slate-700 text-slate-300 hover:border-purple-500/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Módulos */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-400 text-sm">Módulos:</span>
                {modules.map((module) => (
                  <button
                    key={module}
                    onClick={() => toggleModuleFilter(module)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedModules.includes(module)
                        ? 'bg-purple-500 text-white'
                        : 'bg-bg-secondary border border-slate-700 text-slate-300 hover:border-purple-500/50'
                    }`}
                  >
                    {module}
                  </button>
                ))}
              </div>

              {/* Ordenação */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-slate-400 text-sm">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-bg-card border border-slate-700 rounded-lg text-slate-200 focus:border-purple-500 focus:outline-none"
                >
                  <option value="rating">Melhor Avaliado</option>
                  <option value="downloads">Mais Baixado</option>
                  <option value="reviews">Mais Revisado</option>
                </select>
              </div>
            </div>

            {/* Filtros Ativos */}
            {(selectedModules.length > 0 || searchQuery) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-400 text-sm">Filtros ativos:</span>
                {selectedModules.map((module) => (
                  <span
                    key={module}
                    className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-lg text-xs text-purple-300 flex items-center gap-2"
                  >
                    {module}
                    <button
                      onClick={() => toggleModuleFilter(module)}
                      className="hover:text-purple-100"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                {searchQuery && (
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-lg text-xs text-purple-300 flex items-center gap-2">
                    "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-purple-100"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* Botão Criar Agente */}
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

          {/* Resultados */}
          <div className="mb-8">
            <p className="text-slate-400">
              {filteredAgents.length} agente{filteredAgents.length !== 1 ? 's' : ''} encontrado
              {filteredAgents.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Grid de Agentes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-bg-card rounded-3xl border border-slate-800 p-6 hover:border-purple-500/50 transition-all group cursor-pointer relative"
                onClick={() => handleAgentClick(agent)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bot className="text-white" size={32} />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="text-xl font-black text-gradient">{agent.rating}</span>
                    </div>
                    <div className="text-xs text-slate-400">{agent.downloads} downloads</div>
                    <div className="text-xs text-slate-500">{agent.reviews} reviews</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-slate-200">{agent.name}</h3>
                <p className="text-slate-400 mb-4 text-sm leading-relaxed">{agent.description}</p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {agent.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-bg-secondary border border-slate-700 rounded text-xs text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Módulos */}
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
                  <div className="flex gap-2">
                    {agent.previewUrl && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewAgent(agent)
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors"
                        title="Preview"
                      >
                        <Play size={18} />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Ver detalhes
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-slate-400 mb-4">Nenhum agente encontrado</p>
              <p className="text-slate-500">Tente ajustar os filtros de busca</p>
            </motion.div>
          )}

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

      {/* Modal de Preview */}
      {previewAgent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setPreviewAgent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-bg-card rounded-3xl border border-slate-800 p-8 max-w-2xl w-full relative"
          >
            <button
              onClick={() => setPreviewAgent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-slate-200">{previewAgent.name}</h3>
            <p className="text-slate-400 mb-6">{previewAgent.description}</p>
            <div className="bg-bg-secondary rounded-xl p-8 text-center">
              <Play className="text-purple-500 mx-auto mb-4" size={48} />
              <p className="text-slate-400">Preview do agente em desenvolvimento</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  )
}

