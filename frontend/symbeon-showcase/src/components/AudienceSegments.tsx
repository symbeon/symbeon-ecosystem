import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, TrendingUp, FlaskConical, Handshake, ArrowRight } from 'lucide-react'

const segments = [
  {
    id: 'desenvolvedores',
    icon: Code,
    title: '//DESENVOLVEDOR',
    subtitle: 'Ethics-first AI you can deploy',
    description:
      'Framework completo, documentado e pronto para produção. Comece a construir IA ética hoje mesmo.',
    features: [
      'Documentação completa e exemplos',
      'Código aberto e auditável',
      'Quick start em minutos',
      'Comunidade ativa no GitHub',
    ],
    cta: 'Conhecer SEVE Framework',
    ctaLink: '#contato',
    ctaSecondary: 'Ver Documentação',
    stats: [
      { label: 'Arquitetura', value: 'Modular' },
      { label: 'Adapters', value: 'Multi-domínio' },
      { label: 'Qualidade', value: 'Alta' },
    ],
  },
  {
    id: 'investidores',
    icon: TrendingUp,
    title: '//INVESTIDOR',
    subtitle: 'Oportunidade em IA Ética',
    description:
      'Mercado de IA ética em crescimento exponencial. SEVE Framework como diferencial competitivo único.',
    features: [
      'Framework técnico completo e testado',
      'Blockchain governance (único no mercado)',
      'Compliance automático (LGPD/GDPR)',
      'Modelo de licenciamento escalável',
    ],
    cta: 'Ver Oportunidade',
    ctaLink: '#contato',
    ctaSecondary: 'Executive Summary',
    stats: [
      { label: 'Mercado IA Ética', value: '$8.5B+' },
      { label: 'Crescimento Anual', value: '35%+' },
      { label: 'Framework Completo', value: '100%' },
    ],
  },
  {
    id: 'pesquisador',
    icon: FlaskConical,
    title: '//PESQUISADOR',
    subtitle: 'SEVE Lab - P&D em IA Ética',
    description:
      'Laboratório de pesquisa dedicado a avançar o estado da arte em IA ética. Colabore conosco.',
    features: [
      'Artigos acadêmicos (arXiv ready)',
      'Patentes em preparação (INPI)',
      'Áreas de pesquisa ativas',
      'Colaboração com universidades',
    ],
    cta: 'Colaborar no SEVE Lab',
    ctaLink: '#contato',
    ctaSecondary: 'Ver Publicações',
    stats: [
      { label: 'Artigos Acadêmicos', value: '3' },
      { label: 'Patentes', value: '2' },
      { label: 'Áreas de Pesquisa', value: '6' },
    ],
  },
  {
    id: 'parceiro',
    icon: Handshake,
    title: '//PARCEIRO',
    subtitle: 'Parcerias Estratégicas',
    description:
      'Empresas, organizações e instituições. Vamos construir o futuro da IA ética juntos.',
    features: [
      'Integração com seu produto',
      'Licenciamento customizado',
      'Suporte técnico dedicado',
      'Co-desenvolvimento',
    ],
    cta: 'Falar com Equipe',
    ctaLink: '#contato',
    ctaSecondary: 'Ver Casos de Uso',
    stats: [
      { label: 'Parceiros', value: 'Crescendo' },
      { label: 'Integrações', value: 'Multi-domínio' },
      { label: 'Suporte', value: 'Enterprise' },
    ],
  },
]

export default function AudienceSegments() {
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
          <div className="section-label mb-4">//PARA VOCÊ</div>
          <h2 className="section-title text-5xl md:text-7xl mb-6">
            Escolha seu caminho
          </h2>
          <p className="section-subtitle">
            Diferentes públicos, diferentes necessidades. Encontre o que você precisa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {segments.map((segment, index) => (
            <motion.div
              key={segment.id}
              id={segment.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-card p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all group"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <segment.icon className="text-white" size={32} />
                </div>
                <div>
                  <div className="text-sm text-purple-400 font-mono mb-2">{segment.title}</div>
                  <h3 className="text-2xl font-bold text-slate-200 mb-2">{segment.subtitle}</h3>
                </div>
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed text-lg">{segment.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {segment.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-black text-gradient mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <ul className="space-y-2 mb-6">
                {segment.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-400">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <motion.a
                  href={segment.ctaLink}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex-1 px-6 py-3 bg-gradient-accent text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  {segment.cta}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </motion.a>
                <motion.a
                  href={segment.ctaLink}
                  whileHover={{ scale: 1.02 }}
                  className="px-6 py-3 bg-bg-secondary border border-slate-700 text-slate-300 rounded-lg font-semibold hover:border-purple-500/50 transition-all"
                >
                  {segment.ctaSecondary}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

