import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Heart,
  Shield,
  Users,
  Lightbulb,
  Globe,
  Lock,
  Eye,
  Zap,
} from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Empatia',
    description:
      'Colocamos pessoas no centro de tudo. Entendemos necessidades, contextos e culturas antes de criar soluções.',
    color: 'text-red-400',
  },
  {
    icon: Shield,
    title: 'Integridade',
    description:
      'Fazemos o que é certo, não o que é fácil. Nossos valores não são negociáveis, mesmo quando é conveniente.',
    color: 'text-blue-400',
  },
  {
    icon: Users,
    title: 'Colaboração',
    description:
      'Acreditamos que os melhores resultados vêm de equipes diversas trabalhando juntas com propósito compartilhado.',
    color: 'text-green-400',
  },
  {
    icon: Lightbulb,
    title: 'Inovação',
    description:
      'Buscamos constantemente novas formas de resolver problemas antigos, sempre com ética como guia.',
    color: 'text-yellow-400',
  },
  {
    icon: Globe,
    title: 'Sustentabilidade',
    description:
      'Pensamos em impacto de longo prazo. Nossas soluções são projetadas para durar e beneficiar gerações futuras.',
    color: 'text-emerald-400',
  },
  {
    icon: Lock,
    title: 'Privacidade',
    description:
      'Respeitamos dados pessoais como sagrados. Privacidade não é um recurso, é um direito fundamental.',
    color: 'text-purple-400',
  },
  {
    icon: Eye,
    title: 'Transparência',
    description:
      'Acreditamos em código aberto, processos abertos e decisões abertas. Nada a esconder.',
    color: 'text-cyan-400',
  },
  {
    icon: Zap,
    title: 'Excelência',
    description:
      'Buscamos a excelência em tudo que fazemos, não a perfeição, mas a melhoria contínua.',
    color: 'text-orange-400',
  },
]

export default function Values() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="valores" ref={ref} className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-heading"
        >
          <div className="section-label mb-4">//VALORES</div>
          <h2 className="section-title mb-4">Nossos Valores</h2>
          <p className="section-subtitle">
            Os princípios que guiam cada decisão, cada linha de código, cada projeto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-bg-card p-6 rounded-2xl border border-[#585868]/20 hover:border-[#00d4ff]/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <div className={`w-16 h-16 mb-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${value.color.replace('text-', 'bg-')} bg-opacity-20`}>
                <value.icon className={value.color} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#e8e8f0]">{value.title}</h3>
              <p className="text-[#b8b8c8] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

