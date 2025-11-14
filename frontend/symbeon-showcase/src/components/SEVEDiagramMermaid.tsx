import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export default function SEVEDiagramMermaid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const mermaidRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    // Dynamic import of mermaid to avoid bundling it into the main chunk
    let cancelled = false
    import('mermaid')
      .then((mod) => {
        if (cancelled) return
        const mermaid = (mod as any).default || mod
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
        primaryColor: '#8b5cf6',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#6366f1',
        lineColor: '#8b5cf6',
        secondaryColor: '#6366f1',
        tertiaryColor: '#06b6d4',
        background: '#1a2332',
        mainBkg: '#1a2332',
        secondBkg: '#141b2d',
        textColor: '#f1f5f9',
        border1: '#8b5cf6',
        border2: '#6366f1',
        noteBkgColor: '#222b3d',
        noteTextColor: '#f1f5f9',
        noteBorderColor: '#8b5cf6',
        actorBorder: '#8b5cf6',
        actorBkg: '#1a2332',
        actorTextColor: '#f1f5f9',
        actorLineColor: '#8b5cf6',
        signalColor: '#f1f5f9',
        signalTextColor: '#f1f5f9',
        labelBoxBkgColor: '#6366f1',
        labelBoxBorderColor: '#8b5cf6',
        labelTextColor: '#ffffff',
        loopTextColor: '#f1f5f9',
        activationBorderColor: '#8b5cf6',
        activationBkgColor: '#6366f1',
        sequenceNumberColor: '#ffffff',
        sectionBkgColor: '#141b2d',
        altBkgColor: '#1a2332',
        clusterBkg: '#222b3d',
        clusterBorder: '#8b5cf6',
        defaultLinkColor: '#8b5cf6',
        titleColor: '#f1f5f9',
        edgeLabelBackground: '#1a2332',
        compositeTitleBackground: '#141b2d',
        compositeBorder: '#8b5cf6',
          },
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
            padding: 20,
          },
          securityLevel: 'loose',
        })
      })
      .catch((err) => console.error('Failed to load mermaid:', err))
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (isInView && mermaidRef.current && !isRendered) {
      const diagramDefinition = `
graph TB
    subgraph "SEVE Framework - Arquitetura Ética"
        subgraph "Camada de Entrada"
            Vision[SEVE-Vision<br/>👁️ Visão Computacional<br/>Privacy Protection]
            Sense[SEVE-Sense<br/>📡 Fusão Sensorial<br/>IoT Integration]
        end
        
        subgraph "Núcleo Central"
            Core[SEVE-Core<br/>🧠 Orquestração<br/>Knowledge Graph<br/>Context Manager]
        end
        
        subgraph "Camada de Adaptação"
            Universal[SEVE Universal<br/>🌍 Multi-domínio<br/>Domain Adapters<br/>8+ Domains]
            Empathy[Empathy Engine<br/>💝 Motor de Empatia<br/>Cultural Adaptation<br/>Emotional Analysis]
        end
        
        subgraph "Camada de Validação"
            Ethics[SEVE-Ethics<br/>⚖️ Validação Ética<br/>Bias Detection<br/>Compliance]
            Link[SEVE-Link<br/>🔗 Conectividade<br/>Secure APIs<br/>External Integration]
        end
        
        subgraph "Camada de Governança"
            Blockchain[Blockchain Layer<br/>⛓️ Governança<br/>DAO Governance<br/>Transparency]
        end
    end
    
    %% Conexões de Entrada
    Vision -->|Dados Visuais| Core
    Sense -->|Dados Sensoriais| Core
    
    %% Conexões do Núcleo
    Core -->|Orquestração| Universal
    Core -->|Validação| Ethics
    Core -->|Conexão| Link
    
    %% Conexões de Adaptação
    Universal -->|Contexto| Empathy
    Empathy -->|Respostas| Universal
    
    %% Conexões de Validação
    Ethics -->|Auditoria| Blockchain
    Link -->|Transações| Blockchain
    
    %% Fluxo de Retorno
    Universal -.->|Feedback| Core
    Ethics -.->|Validação| Core
    
    %% Estilos
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
    class Blockchain blockchainStyle
      `

      // load mermaid dynamically when needed
      import('mermaid')
        .then((mod) => {
          const mermaid = (mod as any).default || mod
          return mermaid
            .run({
              nodes: [mermaidRef.current],
              suppressErrors: true,
            })
            .then(() => {
              setIsRendered(true)
              // Adicionar animação após renderização
              if (mermaidRef.current) {
                const svg = mermaidRef.current.querySelector('svg')
                if (svg) {
                  svg.style.opacity = '0'
                  svg.style.transition = 'opacity 1s ease-in'
                  setTimeout(() => {
                    svg.style.opacity = '1'
                  }, 100)
                }
              }
            })
        })
        .catch((err) => {
          console.error('Erro ao renderizar Mermaid (dynamic):', err)
        })

      // Inserir definição do diagrama
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = ''
        const pre = document.createElement('pre')
        pre.className = 'mermaid'
        pre.textContent = diagramDefinition
        mermaidRef.current.appendChild(pre)
      }
    }
  }, [isInView, isRendered])

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

          {/* Diagrama Mermaid */}
          <div
            ref={mermaidRef}
            className="relative z-10 w-full overflow-x-auto"
            style={{ minHeight: '600px' }}
          />

          {/* Loading State */}
          {!isRendered && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-400">Carregando arquitetura...</p>
              </div>
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

