import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useCallback, useState } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { X } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

interface ModuleInfo {
  id: string
  name: string
  description: string
  features: string[]
  color: string
  icon: string
}

const moduleInfo: Record<string, ModuleInfo> = {
  Vision: {
    id: 'vision',
    name: 'SEVE-Vision',
    description: 'Visão Computacional com proteção de privacidade',
    features: ['Computer Vision', 'Privacy Protection', 'Object Detection', 'Anonymization'],
    color: '#06b6d4',
    icon: '👁️',
  },
  Sense: {
    id: 'sense',
    name: 'SEVE-Sense',
    description: 'Fusão Sensorial Multi-Sensor',
    features: ['Multi-Sensor', 'IoT Integration', 'Data Fusion', 'Anomaly Detection'],
    color: '#10b981',
    icon: '📡',
  },
  Core: {
    id: 'core',
    name: 'SEVE-Core',
    description: 'Núcleo de Orquestração Central',
    features: ['Orquestração', 'Knowledge Graph', 'Context Manager', 'Inference Engine'],
    color: '#8b5cf6',
    icon: '🧠',
  },
  Universal: {
    id: 'universal',
    name: 'SEVE Universal',
    description: 'Adaptação Multi-domínio',
    features: ['Domain Adapters', 'Universal Context', 'Cross-Domain Learning', '8+ Domains'],
    color: '#6366f1',
    icon: '🌍',
  },
  Empathy: {
    id: 'empathy',
    name: 'Empathy Engine',
    description: 'Motor de Empatia Universal',
    features: ['Cultural Adaptation', 'Emotional Analysis', 'Contextual Responses', 'Multimodal'],
    color: '#ec4899',
    icon: '💝',
  },
  Ethics: {
    id: 'ethics',
    name: 'SEVE-Ethics',
    description: 'Validação Ética Automatizada',
    features: ['Ethical Validation', 'Bias Detection', 'Compliance', 'Audit Trail'],
    color: '#ef4444',
    icon: '⚖️',
  },
  Link: {
    id: 'link',
    name: 'SEVE-Link',
    description: 'Conectividade Segura',
    features: ['Secure APIs', 'IoT Protocols', 'External Integration', 'TLS/SSL'],
    color: '#f59e0b',
    icon: '🔗',
  },
  Blockchain: {
    id: 'blockchain',
    name: 'Blockchain Layer',
    description: 'Governança Descentralizada',
    features: ['DAO Governance', 'Transparency', 'Licensing', 'Tokenomics'],
    color: '#eab308',
    icon: '⛓️',
  },
}

const initialNodes: Node[] = [
  // Camada de Entrada
  {
    id: 'vision',
    type: 'custom',
    position: { x: 100, y: 50 },
    data: { label: 'SEVE-Vision', module: 'Vision' },
    style: {
      background: moduleInfo.Vision.color,
      color: '#fff',
      border: `2px solid ${moduleInfo.Vision.color}`,
      borderRadius: '12px',
      padding: '16px',
      minWidth: 180,
      fontWeight: 'bold',
      boxShadow: `0 4px 12px ${moduleInfo.Vision.color}40`,
    },
  },
  {
    id: 'sense',
    type: 'custom',
    position: { x: 320, y: 50 },
    data: { label: 'SEVE-Sense', module: 'Sense' },
    style: {
      background: moduleInfo.Sense.color,
      color: '#fff',
      border: `2px solid ${moduleInfo.Sense.color}`,
      borderRadius: '12px',
      padding: '16px',
      minWidth: 180,
      fontWeight: 'bold',
      boxShadow: `0 4px 12px ${moduleInfo.Sense.color}40`,
    },
  },
  // Núcleo Central
  {
    id: 'core',
    type: 'custom',
    position: { x: 210, y: 200 },
    data: { label: 'SEVE-Core', module: 'Core' },
    style: {
      background: moduleInfo.Core.color,
      color: '#fff',
      border: `3px solid ${moduleInfo.Core.color}`,
      borderRadius: '16px',
      padding: '20px',
      minWidth: 200,
      fontWeight: 'bold',
      fontSize: '18px',
      boxShadow: `0 6px 20px ${moduleInfo.Core.color}60`,
    },
  },
  // Camada de Adaptação
  {
    id: 'universal',
    type: 'custom',
    position: { x: 50, y: 380 },
    data: { label: 'SEVE Universal', module: 'Universal' },
    style: {
      background: moduleInfo.Universal.color,
      color: '#fff',
      border: `2px solid ${moduleInfo.Universal.color}`,
      borderRadius: '12px',
      padding: '16px',
      minWidth: 180,
      fontWeight: 'bold',
      boxShadow: `0 4px 12px ${moduleInfo.Universal.color}40`,
    },
  },
  {
    id: 'empathy',
    type: 'custom',
    position: { x: 270, y: 380 },
    data: { label: 'Empathy Engine', module: 'Empathy' },
    style: {
      background: moduleInfo.Empathy.color,
      color: '#fff',
      border: `2px solid ${moduleInfo.Empathy.color}`,
      borderRadius: '12px',
      padding: '16px',
      minWidth: 180,
      fontWeight: 'bold',
      boxShadow: `0 4px 12px ${moduleInfo.Empathy.color}40`,
    },
  },
  // Camada de Validação
  {
    id: 'ethics',
    type: 'custom',
    position: { x: 50, y: 560 },
    data: { label: 'SEVE-Ethics', module: 'Ethics' },
    style: {
      background: moduleInfo.Ethics.color,
      color: '#fff',
      border: `2px solid ${moduleInfo.Ethics.color}`,
      borderRadius: '12px',
      padding: '16px',
      minWidth: 180,
      fontWeight: 'bold',
      boxShadow: `0 4px 12px ${moduleInfo.Ethics.color}40`,
    },
  },
  {
    id: 'link',
    type: 'custom',
    position: { x: 270, y: 560 },
    data: { label: 'SEVE-Link', module: 'Link' },
    style: {
      background: moduleInfo.Link.color,
      color: '#fff',
      border: `2px solid ${moduleInfo.Link.color}`,
      borderRadius: '12px',
      padding: '16px',
      minWidth: 180,
      fontWeight: 'bold',
      boxShadow: `0 4px 12px ${moduleInfo.Link.color}40`,
    },
  },
  // Camada de Governança
  {
    id: 'blockchain',
    type: 'custom',
    position: { x: 160, y: 740 },
    data: { label: 'Blockchain Layer', module: 'Blockchain' },
    style: {
      background: moduleInfo.Blockchain.color,
      color: '#fff',
      border: `2px solid ${moduleInfo.Blockchain.color}`,
      borderRadius: '12px',
      padding: '16px',
      minWidth: 200,
      fontWeight: 'bold',
      boxShadow: `0 4px 12px ${moduleInfo.Blockchain.color}40`,
    },
  },
]

const initialEdges: Edge[] = [
  // Conexões de Entrada
  {
    id: 'vision-core',
    source: 'vision',
    target: 'core',
    label: 'Dados Visuais',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Vision.color, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Vision.color },
  },
  {
    id: 'sense-core',
    source: 'sense',
    target: 'core',
    label: 'Dados Sensoriais',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Sense.color, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Sense.color },
  },
  // Conexões do Núcleo
  {
    id: 'core-universal',
    source: 'core',
    target: 'universal',
    label: 'Orquestração',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Core.color, strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Core.color },
  },
  {
    id: 'core-ethics',
    source: 'core',
    target: 'ethics',
    label: 'Validação',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Core.color, strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Core.color },
  },
  {
    id: 'core-link',
    source: 'core',
    target: 'link',
    label: 'Conexão',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Core.color, strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Core.color },
  },
  // Conexões de Adaptação
  {
    id: 'universal-empathy',
    source: 'universal',
    target: 'empathy',
    label: 'Contexto',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Universal.color, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Universal.color },
  },
  {
    id: 'empathy-universal',
    source: 'empathy',
    target: 'universal',
    label: 'Respostas',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Empathy.color, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Empathy.color },
  },
  // Conexões de Validação
  {
    id: 'ethics-blockchain',
    source: 'ethics',
    target: 'blockchain',
    label: 'Auditoria',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Ethics.color, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Ethics.color },
  },
  {
    id: 'link-blockchain',
    source: 'link',
    target: 'blockchain',
    label: 'Transações',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Link.color, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Link.color },
  },
  // Fluxo de Retorno
  {
    id: 'universal-core-feedback',
    source: 'universal',
    target: 'core',
    label: 'Feedback',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Universal.color, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Universal.color },
  },
  {
    id: 'ethics-core-validation',
    source: 'ethics',
    target: 'core',
    label: 'Validação',
    type: 'smoothstep',
    animated: true,
    style: { stroke: moduleInfo.Ethics.color, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: moduleInfo.Ethics.color },
  },
]

export default function SEVEDiagramReactFlow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (node.data?.module) {
      setSelectedModule(node.data.module)
    }
  }, [])

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

          {/* React Flow Diagram */}
          <div className="relative z-10" style={{ height: '800px', width: '100%' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              nodeTypes={{ custom: CustomNode }}
            >
              <Background color="#1e293b" gap={20} />
              <Controls
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
              <MiniMap
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                }}
                nodeColor={(node) => {
                  const module = node.data?.module
                  return module && moduleInfo[module] ? moduleInfo[module].color : '#475569'
                }}
              />
            </ReactFlow>
          </div>

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
                      {moduleInfo[selectedModule].icon} {moduleInfo[selectedModule].name}
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

// Custom Node Component
function CustomNode({ data, selected }: { data: any; selected?: boolean }) {
  const module = data?.module
  const info = module && moduleInfo[module]

  return (
    <div
      className={`px-4 py-3 rounded-lg text-white font-bold text-center transition-all cursor-pointer ${
        selected ? 'ring-4 ring-purple-500/50 scale-105' : ''
      }`}
      style={{
        background: info?.color || '#475569',
        boxShadow: selected
          ? `0 8px 24px ${info?.color}60`
          : `0 4px 12px ${info?.color}40`,
      }}
    >
      <div className="text-lg">{info?.icon} {data.label}</div>
    </div>
  )
}

