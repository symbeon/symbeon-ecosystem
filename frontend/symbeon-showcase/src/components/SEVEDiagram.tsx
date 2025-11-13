import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Brain,
  Eye,
  Shield,
  Link2,
  Radio,
  Globe,
  Heart,
  Zap,
  Layers,
  Network,
  CheckCircle2,
} from 'lucide-react'

interface Module {
  id: string
  name: string
  description: string
  icon: any
  color: string
  position: { x: number; y: number }
  connections: string[]
  features: string[]
}

const modules: Module[] = [
  {
    id: 'core',
    name: 'SEVE-Core',
    description: 'Núcleo de Orquestração',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
    position: { x: 50, y: 25 }, // Centro superior
    connections: ['vision', 'sense', 'ethics', 'link', 'universal'],
    features: ['Orquestração', 'Knowledge Graph', 'Context Manager', 'Inference Engine'],
  },
  {
    id: 'vision',
    name: 'SEVE-Vision',
    description: 'Visão Computacional',
    icon: Eye,
    color: 'from-cyan-500 to-blue-600',
    position: { x: 25, y: 15 }, // Superior esquerdo
    connections: ['core'],
    features: ['Computer Vision', 'Privacy Protection', 'Object Detection', 'Anonymization'],
  },
  {
    id: 'sense',
    name: 'SEVE-Sense',
    description: 'Fusão Sensorial',
    icon: Radio,
    color: 'from-green-500 to-emerald-600',
    position: { x: 75, y: 15 }, // Superior direito
    connections: ['core'],
    features: ['Multi-Sensor', 'IoT Integration', 'Data Fusion', 'Anomaly Detection'],
  },
  {
    id: 'ethics',
    name: 'SEVE-Ethics',
    description: 'Validação Ética',
    icon: Shield,
    color: 'from-red-500 to-pink-600',
    position: { x: 25, y: 50 }, // Meio esquerdo
    connections: ['core', 'blockchain'],
    features: ['Ethical Validation', 'Bias Detection', 'Compliance', 'Audit Trail'],
  },
  {
    id: 'link',
    name: 'SEVE-Link',
    description: 'Conectividade',
    icon: Link2,
    color: 'from-orange-500 to-amber-600',
    position: { x: 75, y: 50 }, // Meio direito
    connections: ['core', 'blockchain'],
    features: ['Secure APIs', 'IoT Protocols', 'External Integration', 'TLS/SSL'],
  },
  {
    id: 'universal',
    name: 'SEVE Universal',
    description: 'Adaptação Multi-domínio',
    icon: Globe,
    color: 'from-indigo-500 to-purple-600',
    position: { x: 50, y: 40 }, // Centro
    connections: ['core', 'empathy'],
    features: ['Domain Adapters', 'Universal Context', 'Cross-Domain Learning', '8+ Domains'],
  },
  {
    id: 'empathy',
    name: 'Empathy Engine',
    description: 'Motor de Empatia',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    position: { x: 50, y: 65 }, // Centro inferior
    connections: ['universal'],
    features: ['Cultural Adaptation', 'Emotional Analysis', 'Contextual Responses', 'Multimodal'],
  },
  {
    id: 'blockchain',
    name: 'Blockchain Layer',
    description: 'Governança Descentralizada',
    icon: Network,
    color: 'from-yellow-500 to-orange-600',
    position: { x: 50, y: 80 }, // Inferior central
    connections: ['ethics', 'link'],
    features: ['DAO Governance', 'Transparency', 'Licensing', 'Tokenomics'],
  },
]

export default function SEVEDiagram() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const selectedModuleData = modules.find((m) => m.id === selectedModule)

  return (
    <section ref={ref} id="seve-diagram" className="section-alt">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-heading"
        >
          <div className="section-label mb-4">//ARQUITETURA</div>
          <h2 className="section-title text-5xl md:text-7xl">
            SEVE Framework
          </h2>
          <p className="section-subtitle">
            Arquitetura modular e interconectada para IA ética
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Diagrama Interativo */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="bg-bg-card rounded-3xl border border-slate-800 p-6 md:p-8 lg:p-12 relative overflow-hidden"
              style={{ minHeight: '600px', aspectRatio: '16/9' }}
            >
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              {/* Conexões */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {modules.map((module) =>
                  module.connections.map((connId) => {
                    const target = modules.find((m) => m.id === connId)
                    if (!target) return null

                    const startX = (module.position.x / 100) * 100
                    const startY = (module.position.y / 100) * 100
                    const endX = (target.position.x / 100) * 100
                    const endY = (target.position.y / 100) * 100

                    return (
                      <motion.line
                        key={`${module.id}-${connId}`}
                        x1={`${startX}%`}
                        y1={`${startY}%`}
                        x2={`${endX}%`}
                        y2={`${endY}%`}
                        stroke="rgba(139, 92, 246, 0.3)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    )
                  })
                )}
              </svg>

              {/* Módulos */}
              <div className="relative" style={{ height: '100%', minHeight: '600px', width: '100%' }}>
                {modules.map((module, index) => {
                  const Icon = module.icon
                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `${module.position.x}%`,
                        top: `${module.position.y}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: selectedModule === module.id ? 10 : 2,
                      }}
                      onClick={() => {
                        setSelectedModule(selectedModule === module.id ? null : module.id)
                        // Analytics
                        if (typeof window !== 'undefined' && (window as any).gtag) {
                          const { AnalyticsEvents } = require('../utils/analytics')
                          AnalyticsEvents.seveModuleClicked(module.name)
                        }
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      aria-label={`Módulo ${module.name}: ${module.description}`}
                    >
                      <div
                        className={`bg-gradient-to-br ${module.color} rounded-xl p-3 md:p-4 shadow-lg border-2 ${
                          selectedModule === module.id
                            ? 'border-white shadow-2xl scale-110 ring-4 ring-purple-500/30'
                            : 'border-transparent group-hover:border-white/50'
                        } transition-all w-32 md:w-36`}
                      >
                        <Icon className="text-white mb-1.5 md:mb-2" size={24} />
                        <div className="text-white font-bold text-xs md:text-sm mb-0.5 leading-tight">{module.name}</div>
                        <div className="text-white/80 text-[10px] md:text-xs leading-tight">{module.description}</div>
                      </div>

                      {/* Pulse effect quando selecionado */}
                      {selectedModule === module.id && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${module.color} rounded-2xl opacity-50`}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          style={{ zIndex: -1 }}
                        />
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Painel de Detalhes */}
          <div className="space-y-6">
            {selectedModuleData ? (
              <motion.div
                key={selectedModuleData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-bg-card rounded-3xl border border-slate-800 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedModuleData.color} rounded-xl flex items-center justify-center`}>
                    <selectedModuleData.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-200">{selectedModuleData.name}</h3>
                    <p className="text-sm text-slate-400">{selectedModuleData.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-purple-400 font-mono mb-2">//FUNCIONALIDADES</div>
                  <ul className="space-y-2">
                    {selectedModuleData.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="text-green-500" size={16} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-sm text-purple-400 font-mono mb-2">//CONECTADO A</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedModuleData.connections.map((connId) => {
                      const conn = modules.find((m) => m.id === connId)
                      if (!conn) return null
                      return (
                        <span
                          key={connId}
                          className="px-3 py-1 bg-bg-secondary border border-slate-700 rounded-lg text-xs text-slate-300"
                        >
                          {conn.name}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                className="bg-bg-card rounded-3xl border border-slate-800 p-6"
              >
                <Layers className="text-purple-500 mb-4" size={32} />
                <h3 className="text-lg font-bold text-slate-200 mb-2">Explore a Arquitetura</h3>
                <p className="text-sm text-slate-400">
                  Clique em qualquer módulo para ver detalhes, funcionalidades e conexões.
                </p>
              </motion.div>
            )}

            {/* Estatísticas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-bg-card rounded-3xl border border-slate-800 p-6"
            >
              <div className="text-sm text-purple-400 font-mono mb-4">//ESTATÍSTICAS</div>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-black text-gradient mb-1">8</div>
                  <div className="text-sm text-slate-400">Módulos Core</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gradient mb-1">8+</div>
                  <div className="text-sm text-slate-400">Domain Adapters</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gradient mb-1">100%</div>
                  <div className="text-sm text-slate-400">Modular</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Fluxo de Dados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-bg-card rounded-3xl border border-slate-800 p-8"
        >
          <div className="text-sm text-purple-400 font-mono mb-6">//FLUXO DE DADOS</div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {['Entrada', 'SEVE-Core', 'Processamento', 'Validação Ética', 'Saída'].map((step, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-2">
                    <Zap className="text-white" size={24} />
                  </div>
                  <div className="text-sm font-semibold text-slate-300">{step}</div>
                </div>
                {i < 4 && (
                  <ArrowRight className="text-purple-500 hidden md:block" size={24} />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ArrowRight({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

