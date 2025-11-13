import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const researchAreas = [
  {
    title: 'IA Ética e Transparência',
    description:
      'Pesquisa em algoritmos de validação ética, detecção de viés, e sistemas de transparência algorítmica. SEVE Framework como base de validação.',
    tags: ['Ética Computacional', 'Transparência', 'Viés Algorítmico'],
  },
  {
    title: 'Privacidade e Proteção de Dados',
    description:
      'Desenvolvimento de técnicas avançadas de anonimização, pseudonimização e proteção de dados pessoais. Compliance nativo com LGPD/GDPR.',
    tags: ['Privacidade', 'LGPD/GDPR', 'Anonimização'],
  },
  {
    title: 'Computação Empática e Cultural',
    description:
      'Pesquisa em sistemas de IA que se adaptam a diferentes contextos culturais, promovendo respostas empáticas e contextualmente apropriadas.',
    tags: ['Empatia', 'Adaptação Cultural', 'Multimodal'],
  },
  {
    title: 'Governança Blockchain',
    description:
      'Exploração de modelos de governança descentralizada para sistemas de IA, utilizando blockchain para transparência e accountability.',
    tags: ['Blockchain', 'DAO', 'Governança'],
  },
  {
    title: 'Adaptação Universal de Domínios',
    description:
      'Pesquisa em transfer learning e adaptação de modelos de IA para múltiplos domínios, mantendo consistência ética através do SEVE Framework.',
    tags: ['Transfer Learning', 'Domain Adaptation', 'Multi-Domain'],
  },
  {
    title: 'Compliance e Regulamentação',
    description:
      'Desenvolvimento de frameworks e ferramentas para compliance automático com regulamentações de IA (EU AI Act, LGPD, GDPR).',
    tags: ['Compliance', 'EU AI Act', 'Regulamentação'],
  },
]

export default function Research() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pesquisa" ref={ref} className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Áreas de Pesquisa
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Linhas de pesquisa ativas do laboratório, todas utilizando o SEVE Framework como núcleo
            ético
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-bg-card p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
              <h3 className="text-xl font-bold mb-3 text-slate-200 relative z-10">
                {area.title}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4 relative z-10">{area.description}</p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-bg-secondary border border-slate-700 rounded-full text-xs text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

