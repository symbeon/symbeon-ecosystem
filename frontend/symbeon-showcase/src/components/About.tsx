import { motion } from 'framer-motion'
import { Target, FlaskConical, Users, Globe } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: Target,
    title: 'Missão',
    description:
      'Desenvolver e promover tecnologias de IA que sejam éticas, transparentes e responsáveis desde o design até a implementação, garantindo que a inovação tecnológica sirva ao bem-estar humano e social.',
  },
  {
    icon: FlaskConical,
    title: 'Abordagem Científica',
    description:
      'Pesquisa rigorosa, metodologia científica validada e publicação em veículos acadêmicos de alto impacto. Combinamos teoria e prática para criar soluções reais e aplicáveis.',
  },
  {
    icon: Users,
    title: 'Colaboração',
    description:
      'Trabalhamos com universidades, centros de pesquisa, empresas e organizações para avançar o estado da arte em IA ética e criar impacto positivo na sociedade.',
  },
  {
    icon: Globe,
    title: 'Impacto Global',
    description:
      'Nossas pesquisas e desenvolvimentos visam criar soluções que transcendem fronteiras, adaptando-se a diferentes contextos culturais e regulatórios globalmente.',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sobre" ref={ref} className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Sobre o SEVE Lab
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Laboratório dedicado à pesquisa e desenvolvimento de sistemas de IA éticos,
            com o SEVE Framework como núcleo central de validação e governança ética.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-bg-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all group"
            >
              <div className="w-16 h-16 mb-4 bg-gradient-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-200">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

