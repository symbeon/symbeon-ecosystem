import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, TrendingUp, Handshake, ArrowRight, Users, BookOpen } from 'lucide-react'

const participationWays = [
  {
    id: 'colaborar',
    icon: Code,
    title: 'Colaborar',
    subtitle: 'Desenvolvedores & Pesquisadores',
    description:
      'Contribua com código, documentação ou pesquisa. Faça parte da comunidade que está construindo o futuro da IA ética.',
    features: [
      'Contribuir com código',
      'Documentar funcionalidades',
      'Participar de pesquisas',
      'Comunidade ativa',
      'Bounties e revenue-share em módulos',
    ],
    cta: 'Começar a Contribuir',
    ctaLink: '#contato',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'investir',
    icon: TrendingUp,
    title: 'Investir',
    subtitle: 'Investidores & Parceiros Estratégicos',
    description:
      'Apoie o crescimento da Symbeon e faça parte da transformação da IA ética. Oportunidades de investimento e parcerias estratégicas.',
    features: [
      'Oportunidades de investimento',
      'Parcerias estratégicas',
      'Modelo escalável',
      'Mercado em crescimento',
      'Receita via licenciamento e serviços',
    ],
    cta: 'Ver Oportunidade',
    ctaLink: '#contato',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'aprender',
    icon: BookOpen,
    title: 'Aprender',
    subtitle: 'Comunidade & Estudantes',
    description:
      'Acesse recursos educacionais, participe de workshops e aprenda sobre IA ética. Conhecimento aberto e acessível.',
    features: [
      'Recursos educacionais',
      'Workshops e eventos',
      'Documentação completa',
      'Comunidade de aprendizado',
      'Cursos e certificações pagas',
    ],
    cta: 'Explorar Recursos',
    ctaLink: '#contato',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'parcerias',
    icon: Handshake,
    title: 'Parcerias',
    subtitle: 'Empresas & Organizações',
    description:
      'Integre o SEVE Framework em sua organização. Licenciamento, suporte técnico e co-desenvolvimento de soluções.',
    features: [
      'Integração com seu produto',
      'Licenciamento customizado',
      'Suporte técnico dedicado',
      'Co-desenvolvimento',
      'Licenciamento, co-sell e suporte premium',
    ],
    cta: 'Falar com Equipe',
    ctaLink: '#contato',
    color: 'from-orange-500 to-red-500',
  },
]

export default function HowToParticipate() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-heading"
        >
          <div className="section-label mb-4">//PARTICIPAÇÃO</div>
          <h2 className="section-title text-5xl md:text-7xl mb-6">
            Como Participar
          </h2>
          <p className="section-subtitle">
            Diferentes formas de fazer parte da jornada da Symbeon. Escolha a que faz mais sentido para você.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {participationWays.map((way, index) => (
            <motion.div
              key={way.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            className="bg-bg-card p-8 rounded-2xl border border-[#585868]/20 hover:border-[#00d4ff]/30 transition-all group relative overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${way.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${way.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <way.icon className="text-white" size={32} />
                  </div>
                  <div>
                    <div className="text-sm text-[#00d4ff] font-mono mb-2">{way.title}</div>
                    <h3 className="text-2xl font-bold text-[#e8e8f0] mb-2">{way.subtitle}</h3>
                  </div>
                </div>

                <p className="text-[#b8b8c8] mb-6 leading-relaxed text-lg">{way.description}</p>

                <ul className="space-y-2 mb-6">
                  {way.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#b8b8c8]">
                      <span className="text-[#00ff88] mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href={way.ctaLink}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${way.color} text-white rounded-lg font-bold hover:shadow-lg transition-all`}
                >
                  {way.cta}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Onboarding */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-[#b8b8c8] mb-4">
            Não tem certeza de qual caminho seguir?
          </p>
          <motion.button
            onClick={() => {
              const event = new CustomEvent('show-onboarding')
              window.dispatchEvent(event)
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-bg-card border border-[#00d4ff]/30 text-[#e8e8f0] rounded-xl font-semibold hover:border-[#00d4ff]/50 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Users size={20} />
            Criar Meu Perfil Personalizado
          </motion.button>
          <p className="text-sm text-[#888898] mt-2">
            Responda algumas perguntas e descubra o melhor caminho para você
          </p>
        </motion.div>
      </div>
    </section>
  )
}

