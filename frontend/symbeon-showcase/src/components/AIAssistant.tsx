import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Brain, 
  MessageSquare, 
  Zap, 
  Shield, 
  CheckCircle2,
  Database,
  Search,
  Lightbulb,
  ArrowRight
} from 'lucide-react'

const knowledgeBaseFeatures = [
  {
    icon: Database,
    title: 'Base de Conhecimento Completa',
    description: 'Toda nossa documentação técnica, metodologias e referências bibliográficas integradas em uma base de conhecimento inteligente',
  },
  {
    icon: Search,
    title: 'Busca Contextual Inteligente',
    description: 'O agente compreende o contexto da sua pergunta e busca nas metodologias, documentação técnica e referências relevantes',
  },
  {
    icon: Lightbulb,
    title: 'Assistência Personalizada',
    description: 'Respostas adaptadas ao seu perfil, contexto e necessidades, usando toda a expertise documentada da Symbeon',
  },
  {
    icon: Shield,
    title: 'Alinhamento com Protocolos',
    description: 'Todas as respostas são alinhadas com nossos protocolos de certificação ética e metodologias validadas',
  },
]

const assistantCapabilities = [
  {
    category: 'Documentação Técnica',
    items: [
      'Arquitetura do SEVE Framework',
      'Guia de integração e APIs',
      'Melhores práticas e padrões',
      'Troubleshooting e soluções',
    ],
  },
  {
    category: 'Metodologias',
    items: [
      'Protocolos de certificação ética',
      'Processos de validação',
      'Framework SiD (ELSI)',
      'Metodologias de compliance',
    ],
  },
  {
    category: 'Referências e Conhecimento',
    items: [
      'Referências bibliográficas',
      'Padrões regulatórios (LGPD/GDPR)',
      'Benchmarks e métricas',
      'Casos de uso e aplicações',
    ],
  },
]

export default function AIAssistant() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ai-assistant" ref={ref} className="section relative overflow-hidden bg-[#0a0a0f]">
      {/* Elegant subtle overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(0,212,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_80%_110%,rgba(0,255,136,0.05),transparent_60%)]" />
      </div>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-heading"
        >
          <div className="section-label mb-4">//ASSISTENTE INTELIGENTE</div>
          <h2 className="section-title text-5xl md:text-7xl mb-6">
            Seu Assistente de IA Ética
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Um agente inteligente que utiliza toda nossa documentação, metodologias e referências bibliográficas 
            como base de conhecimento para assistir sua experiência na plataforma Symbeon
          </p>
        </motion.div>

        {/* Main Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-bg-card p-8 md:p-12 rounded-3xl text-[#e8e8f0] mb-12 border border-[#585868]/20"
        >
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff]/20 to-[#00ff88]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Brain className="text-[#00d4ff]" size={48} />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-4">Base de Conhecimento Integrada</h3>
              <p className="text-xl text-[#b8b8c8] leading-relaxed mb-4">
                Nossa documentação completa, metodologias validadas e referências bibliográficas formam uma{' '}
                <span className="font-semibold">base de conhecimento abrangente</span> que alimenta nosso assistente de IA.
              </p>
              <p className="text-lg text-[#b8b8c8] leading-relaxed">
                O agente utiliza toda essa informação para fornecer respostas precisas, contextualizadas e alinhadas 
                com nossos protocolos de certificação ética, garantindo que você tenha acesso ao conhecimento mais 
                atualizado e relevante da Symbeon.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {knowledgeBaseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-bg-secondary p-6 rounded-2xl border border-[#585868]/20"
              >
                <feature.icon className="mb-4" size={32} />
                <h4 className="text-2xl font-bold mb-2 text-[#e8e8f0]">{feature.title}</h4>
                <p className="text-[#b8b8c8] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="section-heading mb-8">
            <div className="section-label mb-4">//CAPACIDADES</div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">
              O Que o Assistente Conhece
            </h3>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Toda nossa documentação técnica, metodologias e referências formam a base de conhecimento do assistente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assistantCapabilities.map((capability, index) => (
              <motion.div
                key={capability.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-bg-card p-6 rounded-2xl border border-slate-800"
              >
                <h4 className="text-xl font-bold text-slate-200 mb-4">{capability.category}</h4>
                <ul className="space-y-2">
                  {capability.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={16} />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="bg-bg-card p-8 md:p-12 rounded-3xl border border-slate-800"
        >
          <div className="flex items-center gap-4 mb-6">
            <Zap className="text-yellow-400" size={40} />
            <h3 className="text-2xl font-bold text-slate-200">Como Isso Ajuda Você</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-2">Para Investidores</h4>
              <p className="text-slate-400 leading-relaxed">
                Acesso rápido a informações técnicas, metodologias validadas e casos de uso que demonstram 
                a robustez e seriedade da Symbeon. O assistente pode responder questões sobre compliance, 
                arquitetura e viabilidade técnica.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-2">Para Editais e Propostas</h4>
              <p className="text-slate-400 leading-relaxed">
                Informações precisas sobre metodologias, protocolos de certificação e alinhamento regulatório 
                para fortalecer propostas. O assistente fornece dados técnicos e referências relevantes 
                para cada contexto.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-accent text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <MessageSquare size={20} />
            Experimentar o Assistente
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

