import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const publications = [
  {
    title: 'SEVE Framework: Technical Architecture',
    meta: 'Artigo Técnico • arXiv (preparado)',
    description:
      'Descrição técnica completa da arquitetura do SEVE Framework, incluindo módulos core, integração blockchain, e benchmarks de performance.',
  },
  {
    title: 'Ethical Compliance in AI Systems',
    meta: 'Artigo de Compliance • arXiv (preparado)',
    description:
      'Análise de compliance automático em sistemas de IA, com foco em LGPD, GDPR e EU AI Act. SEVE Framework como estudo de caso.',
  },
  {
    title: 'Universal Empathy Engine',
    meta: 'Artigo de Computação Empática • arXiv (preparado)',
    description:
      'Motor de Empatia Universal: sistema multimodal para respostas empáticas culturalmente adaptadas. Arquitetura e avaliação experimental.',
  },
  {
    title: 'Validação Ética Automatizada com Blockchain',
    meta: 'Patente • INPI (em preparação)',
    description:
      'Sistema inovador de validação ética automatizada utilizando blockchain para transparência e imutabilidade de decisões éticas.',
  },
  {
    title: 'Motor de Empatia Universal com Adaptação Cultural',
    meta: 'Patente • INPI (em preparação)',
    description:
      'Sistema de IA multimodal que adapta respostas empáticas a diferentes contextos culturais, mantendo coerência ética.',
  },
]

export default function Publications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="publicacoes" ref={ref} className="py-24 px-4 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Publicações e Produção Científica
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Artigos acadêmicos, patentes e contribuições científicas do laboratório
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-bg-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all"
            >
              <h3 className="text-lg font-bold mb-2 text-slate-200">{pub.title}</h3>
              <p className="text-xs text-slate-500 mb-3">{pub.meta}</p>
              <p className="text-slate-400 leading-relaxed">{pub.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

