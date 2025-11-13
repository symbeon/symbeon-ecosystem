import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  Heart, 
  GraduationCap, 
  ShoppingCart,
  Briefcase,
  Stethoscope,
  Award,
  Car,
  Shield,
  Globe,
  Users
} from 'lucide-react'

const proofItems = [
  {
    icon: FileText,
    label: 'Documentação',
    value: '100%',
    description: 'Completa e atualizada',
    color: 'text-cyan-400',
  },
  {
    icon: CheckCircle2,
    label: 'Qualidade',
    value: 'Alta',
    description: 'Testes e validação contínua',
    color: 'text-green-400',
  },
  {
    icon: TrendingUp,
    label: 'Arquitetura',
    value: 'Modular',
    description: 'Design flexível e extensível',
    color: 'text-purple-400',
  },
  {
    icon: Award,
    label: 'Compliance',
    value: 'Nativo',
    description: 'LGPD/GDPR integrado',
    color: 'text-indigo-400',
  },
]

const commercialApplications = [
  {
    icon: Stethoscope,
    title: 'Saúde',
    description: 'Análise de dados médicos com validação ética completa e compliance HIPAA',
    features: ['Diagnóstico assistido por IA', 'Privacidade garantida', 'Compliance HIPAA/LGPD'],
    color: 'from-red-500 to-pink-500',
    useCase: 'Assistente médico adaptativo com empatia e proteção de dados sensíveis',
  },
  {
    icon: ShoppingCart,
    title: 'Varejo',
    description: 'Checkout inteligente com análise ESG por cesta e otimização de fluxo',
    features: ['Checkout automatizado', 'Análise ESG por compra', 'Redução de furtos'],
    color: 'from-blue-500 to-cyan-500',
    useCase: 'Sistemas de varejo inteligente com autenticação ética e análise ESG integrada',
  },
  {
    icon: Car,
    title: 'Mobilidade',
    description: 'Sistemas de transporte inteligente com adaptação contextual e segurança',
    features: ['Veículos autônomos éticos', 'Otimização de rotas', 'Smart City integration'],
    color: 'from-indigo-500 to-purple-500',
    useCase: 'Sistemas de mobilidade urbana com IA ética, otimização sustentável e adaptação contextual',
  },
  {
    icon: GraduationCap,
    title: 'Educação',
    description: 'Tutores personalizados com adaptação cultural e suporte emocional',
    features: ['Aprendizado adaptativo', 'Empatia cultural', 'Acessibilidade universal'],
    color: 'from-purple-500 to-indigo-500',
    useCase: 'Plataforma educacional adaptativa com suporte emocional e cultural',
  },
  {
    icon: Building2,
    title: 'Financeiro',
    description: 'Análise de crédito ética, transparente e sem vieses algorítmicos',
    features: ['Análise sem vieses', 'Transparência total', 'Inclusão financeira'],
    color: 'from-green-500 to-emerald-500',
    useCase: 'Sistemas de crédito justos com validação ética automatizada',
  },
  {
    icon: Briefcase,
    title: 'Recursos Humanos',
    description: 'Recrutamento justo, diverso e transparente com IA ética',
    features: ['Seleção imparcial', 'Promoção de diversidade', 'Transparência algorítmica'],
    color: 'from-orange-500 to-red-500',
    useCase: 'Plataformas de RH com detecção de vieses e promoção de equidade',
  },
  {
    icon: Heart,
    title: 'Social',
    description: 'Plataformas de impacto social com métricas ESG mensuráveis',
    features: ['Impacto mensurável', 'Sustentabilidade', 'Comunidade engajada'],
    color: 'from-pink-500 to-rose-500',
    useCase: 'Soluções sociais com análise de impacto e governança transparente',
  },
  {
    icon: Globe,
    title: 'Smart City',
    description: 'Cidades inteligentes com serviços adaptativos e empatia cívica',
    features: ['Serviços urbanos adaptativos', 'Análise de padrões cívicos', 'Governança participativa'],
    color: 'from-teal-500 to-cyan-500',
    useCase: 'Sistemas urbanos inteligentes com personalização cívica e ética',
  },
]

const documentationRobustness = [
  {
    icon: FileText,
    title: 'Documentação Técnica',
    description: 'Guia completo de instalação, APIs, exemplos de código e tutoriais',
    stats: '100% de cobertura',
  },
  {
    icon: Shield,
    title: 'Compliance e Regulamentações',
    description: 'LGPD, GDPR, HIPAA e preparação para EU AI Act',
    stats: 'Multi-jurisdicional',
  },
  {
    icon: Award,
    title: 'Governança e Transparência',
    description: 'DAO, tokenomics, roadmap público e processos documentados',
    stats: '100% transparente',
  },
]

const enterpriseCredentials = [
  {
    icon: Users,
    title: 'Adoção Empresarial',
    description: 'Framework testado e validado em múltiplos contextos comerciais',
    items: [
      'Casos de uso reais em produção',
      'Validação em diferentes nichos',
      'Feedback de empresas parceiras',
      'ROI comprovado em projetos piloto',
    ],
  },
  {
    icon: CheckCircle2,
    title: 'Qualidade e Confiabilidade',
    description: 'Padrões enterprise de qualidade e segurança',
    items: [
      'Testes automatizados extensivos',
      'Validação contínua de ética',
      'Auditoria de código regular',
      'Monitoramento de performance',
    ],
  },
  {
    icon: Globe,
    title: 'Compliance Global',
    description: 'Conformidade com regulamentações internacionais',
    items: [
      'LGPD (Brasil)',
      'GDPR (Europa)',
      'HIPAA (Saúde - EUA)',
      'Preparado para EU AI Act',
    ],
  },
]

export default function Proof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proof" ref={ref} className="section-alt section-compact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-heading"
        >
          <div className="section-label mb-4">//PROVA SOCIAL</div>
          <h2 className="section-title text-5xl md:text-7xl">
            Não é promessa.
            <br />
            É realidade.
          </h2>
          <p className="section-subtitle mt-4">
            Aplicações comerciais em múltiplos nichos e documentação robusta que posiciona a Symbeon como empresa séria e confiável
          </p>
        </motion.div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {proofItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="bg-bg-card p-6 rounded-xl border border-[#585868]/20 text-center hover:border-[#00d4ff]/30 transition-all"
            >
              <item.icon className={`${item.color} mx-auto mb-4`} size={32} />
              <div className="text-4xl font-black text-gradient mb-2">{item.value}</div>
              <div className="text-sm text-[#b8b8c8] mb-1">{item.label}</div>
              <div className="text-xs text-[#888898]">{item.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Aplicações Comerciais */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="section-heading mb-8">
            <div className="section-label mb-4">//APLICAÇÕES COMERCIAIS</div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#e8e8f0] mb-4">
              SEVE em Diferentes Nichos de Mercado
            </h3>
            <p className="text-lg text-[#b8b8c8] max-w-3xl mx-auto">
              O framework SEVE está sendo aplicado em diversos setores, demonstrando sua versatilidade, robustez e capacidade de adaptação a diferentes contextos comerciais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commercialApplications.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-bg-card p-6 rounded-2xl border border-[#585868]/20 hover:border-[#00d4ff]/30 transition-all group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <app.icon className="text-white" size={32} />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black text-[#e8e8f0] mb-2">
                    <span className="type-title">{app.title}</span>
                  </h4>
                  <p className="text-[#b8b8c8] mb-4 text-sm leading-relaxed">{app.description}</p>
                  <div className="mb-4">
                    <div className="text-xs text-[#00d4ff] font-mono mb-2">//CASO DE USO</div>
                    <p className="text-[#b8b8c8] text-xs leading-relaxed">{app.useCase}</p>
                  </div>
                  <ul className="space-y-2">
                    {app.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#b8b8c8] text-sm">
                        <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Robustez Documental */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="section-heading mb-8">
            <div className="section-label mb-4">//ROBUSTEZ DOCUMENTAL</div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#e8e8f0] mb-4">
              Documentação Completa e Abrangente
            </h3>
            <p className="text-lg text-[#b8b8c8] max-w-3xl mx-auto">
              Nossa documentação técnica, metodologias e referências bibliográficas formam uma base de conhecimento robusta, posicionando a Symbeon como empresa séria e confiável
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentationRobustness.map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-bg-card p-6 rounded-2xl border border-[#585868]/20 text-center"
              >
                <doc.icon className="text-cyan-400 mx-auto mb-4" size={40} />
                <h4 className="text-xl font-bold text-[#e8e8f0] mb-2">{doc.title}</h4>
                <p className="text-[#b8b8c8] mb-4 text-sm leading-relaxed">{doc.description}</p>
                <p className="text-xs text-[#00d4ff] font-mono">{doc.stats}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Credenciais Empresariais */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="bg-bg-card p-8 md:p-12 rounded-3xl border border-[#585868]/20"
        >
          <div className="section-heading mb-8">
            <div className="section-label mb-4">//CREDENCIAIS EMPRESARIAIS</div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#e8e8f0] mb-4">
              Posicionamento como Empresa Séria e Confiável
            </h3>
            <p className="text-lg text-[#b8b8c8] max-w-3xl mx-auto">
              A Symbeon demonstra seriedade através de práticas empresariais robustas, compliance global e compromisso com qualidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enterpriseCredentials.map((credential, index) => (
              <motion.div
                key={credential.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-bg-secondary p-6 rounded-xl border border-[#585868]/20"
              >
                <credential.icon className="text-indigo-400 mb-4" size={32} />
                <h4 className="text-xl font-bold text-[#e8e8f0] mb-2">{credential.title}</h4>
                <p className="text-[#b8b8c8] mb-4 text-sm leading-relaxed">{credential.description}</p>
                <ul className="space-y-2">
                  {credential.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#b8b8c8] text-sm">
                      <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
