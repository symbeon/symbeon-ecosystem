import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react'

interface ModuleInfo {
  id: string
  name: string
  description: string
  features: string[]
  color: string
}

const moduleInfo: Record<string, ModuleInfo> = {
  Vision: {
    id: 'vision',
    name: 'SEVE-Vision',
    description: 'Visão Computacional com proteção de privacidade',
    features: ['Computer Vision', 'Privacy Protection', 'Object Detection', 'Anonymization'],
    color: '#06b6d4',
  },
  Sense: {
    id: 'sense',
    name: 'SEVE-Sense',
    description: 'Fusão Sensorial Multi-Sensor',
    features: ['Multi-Sensor', 'IoT Integration', 'Data Fusion', 'Anomaly Detection'],
    color: '#10b981',
  },
  Core: {
    id: 'core',
    name: 'SEVE-Core',
    description: 'Núcleo de Orquestração Central',
    features: ['Orquestração', 'Knowledge Graph', 'Context Manager', 'Inference Engine'],
    color: '#8b5cf6',
  },
  Universal: {
    id: 'universal',
    name: 'SEVE Universal',
    description: 'Adaptação Multi-domínio',
    features: ['Domain Adapters', 'Universal Context', 'Cross-Domain Learning', '8+ Domains'],
    color: '#6366f1',
  },
  Empathy: {
    id: 'empathy',
    name: 'Empathy Engine',
    description: 'Motor de Empatia Universal',
    features: ['Cultural Adaptation', 'Emotional Analysis', 'Contextual Responses', 'Multimodal'],
    color: '#ec4899',
  },
  Ethics: {
    id: 'ethics',
    name: 'SEVE-Ethics',
    description: 'Validação Ética Automatizada',
    features: ['Ethical Validation', 'Bias Detection', 'Compliance', 'Audit Trail'],
    color: '#ef4444',
  },
  Link: {
    id: 'link',
    name: 'SEVE-Link',
    description: 'Conectividade Segura',
    features: ['Secure APIs', 'IoT Protocols', 'External Integration', 'TLS/SSL'],
    color: '#f59e0b',
  },
  Blockchain: {
    id: 'blockchain',
    name: 'Blockchain Layer',
    description: 'Governança Descentralizada',
    features: ['DAO Governance', 'Transparency', 'Licensing', 'Tokenomics'],
    color: '#eab308',
  },
}

export default function SEVEDiagramInteractive() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const mermaidRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [animationStep, setAnimationStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // dynamically import mermaid to avoid bundling it in the main chunk
    let cancelled = false
    import('mermaid')
      .then((mod) => {
        if (cancelled) return
        const mermaid = (mod as any).default || mod
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: false,
            curve: 'basis',
            padding: 20,
          },
        })
      })
      .catch((err) => console.error('Failed to load mermaid:', err))
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (isInView && mermaidRef.current && !isRendered) {
      const diagramDefinition = `graph TB
    subgraph SEVE[SEVE Framework]
        subgraph ENTRADA[Camada de Entrada]
            Vision[SEVE-Vision]
            Sense[SEVE-Sense]
        end
        
        subgraph NUCLEO[Nucleo Central]
            Core[SEVE-Core]
        end
        
        subgraph ADAPTACAO[Camada de Adaptacao]
            Universal[SEVE Universal]
            Empathy[Empathy Engine]
        end
        
        subgraph VALIDACAO[Camada de Validacao]
            Ethics[SEVE-Ethics]
            Link[SEVE-Link]
        end
        
        subgraph GOVERNANCA[Camada de Governanca]
            Blockchain[Blockchain Layer]
        end
    end
    
    Vision -->|Dados Visuais| Core
    Sense -->|Dados Sensoriais| Core
    Core -->|Orquestracao| Universal
    Core -->|Validacao| Ethics
    Core -->|Conexao| Link
    Universal -->|Contexto| Empathy
    Empathy -->|Respostas| Universal
    Ethics -->|Auditoria| Blockchain
    Link -->|Transacoes| Blockchain
    Universal -.->|Feedback| Core
    Ethics -.->|Validacao| Core
    
    classDef visionStyle fill:#06b6d4,stroke:#0891b2,stroke-width:3px,color:#fff
    classDef senseStyle fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff
    classDef coreStyle fill:#8b5cf6,stroke:#7c3aed,stroke-width:4px,color:#fff
    classDef universalStyle fill:#6366f1,stroke:#4f46e5,stroke-width:3px,color:#fff
    classDef empathyStyle fill:#ec4899,stroke:#db2777,stroke-width:3px,color:#fff
    classDef ethicsStyle fill:#ef4444,stroke:#dc2626,stroke-width:3px,color:#fff
    classDef linkStyle fill:#f59e0b,stroke:#d97706,stroke-width:3px,color:#fff
    classDef blockchainStyle fill:#eab308,stroke:#ca8a04,stroke-width:3px,color:#fff
    
    class Vision visionStyle
    class Sense senseStyle
    class Core coreStyle
    class Universal universalStyle
    class Empathy empathyStyle
    class Ethics ethicsStyle
    class Link linkStyle
    class Blockchain blockchainStyle`

      mermaidRef.current.innerHTML = ''

      // Criar elemento com ID único
      const id = `mermaid-${Date.now()}`
      const pre = document.createElement('pre')
      pre.className = 'mermaid'
      pre.id = id
      pre.textContent = diagramDefinition.trim()
      mermaidRef.current.appendChild(pre)

      // Renderizar Mermaid usando import() dinamico
      import('mermaid')
        .then(async (mod) => {
          const mermaid = (mod as any).default || mod
          try {
            await mermaid.run({ nodes: [pre], suppressErrors: true })
            setIsRendered(true)
            setTimeout(() => {
              addInteractivity()
            }, 500)
          } catch (err) {
            console.error('Erro ao renderizar Mermaid (dynamic run):', err)
            // fallback para render()
            try {
              const result = await mermaid.render(id, diagramDefinition.trim())
              if (result && mermaidRef.current) {
                mermaidRef.current.innerHTML = result.svg
                setIsRendered(true)
                setTimeout(() => {
                  addInteractivity()
                }, 500)
              } else {
                setIsRendered(true)
              }
            } catch (renderErr) {
              console.error('Erro no fallback render (dynamic):', renderErr)
              setIsRendered(true)
            }
          }
        })
        .catch((err) => {
          console.error('Failed to load mermaid for rendering:', err)
          setIsRendered(true)
        })
    }
  }, [isInView, isRendered])

  const addInteractivity = () => {
    if (!mermaidRef.current) return
    const svg = mermaidRef.current.querySelector('svg')
    if (!svg) return

    // Adicionar eventos de clique nos nós
    const nodes = svg.querySelectorAll('.node')
    nodes.forEach((node) => {
      const textElement = node.querySelector('text')
      if (textElement) {
        const text = textElement.textContent || ''
        const moduleKey = Object.keys(moduleInfo).find((key) => text.includes(key))
        if (moduleKey) {
          ;(node as HTMLElement).style.cursor = 'pointer'
          node.addEventListener('click', () => {
            setSelectedModule(moduleKey)
          })
        }
      }
    })
  }

  const startStepAnimation = () => {
    setIsAnimating(true)
    setAnimationStep(0)
    const steps = ['Vision', 'Sense', 'Core', 'Universal', 'Empathy', 'Ethics', 'Link', 'Blockchain']
    steps.forEach((step, index) => {
      setTimeout(() => {
        setSelectedModule(step)
        setAnimationStep(index + 1)
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsAnimating(false)
            setSelectedModule(null)
          }, 2000)
        }
      }, index * 800)
    })
  }

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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-bg-card rounded-3xl border border-slate-800 p-6 md:p-8 lg:p-12 relative overflow-hidden"
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

          {/* Controles */}
          <div className="absolute top-4 right-4 z-30 flex gap-2">
            <motion.button
              onClick={startStepAnimation}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-bg-secondary border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-purple-500/50 transition-all"
              title="Animar passo a passo"
            >
              <RotateCcw size={20} />
            </motion.button>
          </div>

          {/* Diagrama Mermaid com Zoom/Pan */}
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={3}
            wheel={{ step: 0.1 }}
            doubleClick={{ disabled: false }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                  <motion.button
                    onClick={() => zoomIn()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-bg-secondary border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-purple-500/50 transition-all"
                    title="Zoom In"
                  >
                    <ZoomIn size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => zoomOut()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-bg-secondary border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-purple-500/50 transition-all"
                    title="Zoom Out"
                  >
                    <ZoomOut size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => resetTransform()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-bg-secondary border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-purple-500/50 transition-all"
                    title="Reset"
                  >
                    <RotateCcw size={20} />
                  </motion.button>
                </div>

                <TransformComponent>
                  <div
                    ref={mermaidRef}
                    className="relative z-10 w-full"
                    style={{ minHeight: '600px' }}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>

          {/* Loading State */}
          {!isRendered && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-400">Carregando arquitetura...</p>
              </div>
            </div>
          )}

          {/* Tooltip/Modal de Módulo */}
          <AnimatePresence>
            {selectedModule && moduleInfo[selectedModule] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-bg-card border border-purple-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl"
                style={{ borderColor: moduleInfo[selectedModule].color }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-200 mb-2">
                      {moduleInfo[selectedModule].name}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {moduleInfo[selectedModule].description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div>
                  <div className="text-sm text-purple-400 font-mono mb-2">//FUNCIONALIDADES</div>
                  <ul className="space-y-2">
                    {moduleInfo[selectedModule].features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: moduleInfo[selectedModule].color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicador de Animação */}
          {isAnimating && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 bg-purple-500/20 backdrop-blur-sm border border-purple-500/50 rounded-lg px-4 py-2">
              <p className="text-sm text-purple-300 font-mono">
                Passo {animationStep} de 8
              </p>
            </div>
          )}
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-bg-card rounded-3xl border border-slate-800 p-6 text-center">
            <div className="text-4xl font-black text-gradient mb-2">8</div>
            <div className="text-slate-400">Módulos Core</div>
          </div>
          <div className="bg-bg-card rounded-3xl border border-slate-800 p-6 text-center">
            <div className="text-4xl font-black text-gradient mb-2">8+</div>
            <div className="text-slate-400">Domain Adapters</div>
          </div>
          <div className="bg-bg-card rounded-3xl border border-slate-800 p-6 text-center">
            <div className="text-4xl font-black text-gradient mb-2">100%</div>
            <div className="text-slate-400">Modular</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

