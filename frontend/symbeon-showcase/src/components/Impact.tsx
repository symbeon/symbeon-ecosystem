import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Users, Globe, Heart } from 'lucide-react'

const impacts = [
  {
    icon: TrendingUp,
    title: 'Tecnologia Responsável',
    description:
      'Criamos frameworks e ferramentas que outras organizações podem usar para construir sistemas éticos desde o início.',
  },
  {
    icon: Users,
    title: 'Comunidade Engajada',
    description:
      'Construímos uma comunidade global de desenvolvedores, pesquisadores e organizações comprometidos com tecnologia ética.',
  },
  {
    icon: Globe,
    title: 'Impacto Global',
    description:
      'Nossas soluções são projetadas para transcender fronteiras, adaptando-se a diferentes contextos culturais e regulatórios.',
  },
  {
    icon: Heart,
    title: 'Bem-Estar Humano',
    description:
      'Cada projeto, cada linha de código, cada decisão é guiada por uma pergunta: isso melhora a vida das pessoas?',
  },
]

export default function Impact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="impacto" ref={ref} className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-heading"
        >
          <h2 className="section-title mb-4">Nosso Impacto</h2>
          <p className="section-subtitle">
            Como estamos transformando o mundo através da tecnologia ética
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-bg-card p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all group"
            >
              <div className="w-16 h-16 mb-4 bg-gradient-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <impact.icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-200">{impact.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">{impact.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-bg-card p-8 md:p-12 rounded-3xl border border-slate-800 text-center"
        >
          <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed mb-6">
            Acreditamos que{' '}
            <span className="text-gradient font-bold">tecnologia com propósito</span> pode ser a
            força mais poderosa para o bem no século XXI.
          </p>
          <p className="text-xl text-slate-400">
            E estamos comprometidos em fazer nossa parte.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

