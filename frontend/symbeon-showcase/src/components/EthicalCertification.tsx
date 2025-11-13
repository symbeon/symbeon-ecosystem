import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Shield, 
  CheckCircle2, 
  FileCheck, 
  Award, 
  Lock, 
  Eye, 
  Users, 
  Globe,
  ArrowRight,
  Settings
} from 'lucide-react'

const certificationServices = [
  {
    icon: FileCheck,
    title: 'Protocolos Éticos Personalizados',
    description: 'Desenvolvemos protocolos éticos customizados para seu setor e contexto específico',
    features: [
      'Análise de riscos éticos do seu sistema',
      'Protocolos alinhados com LGPD/GDPR',
      'Documentação completa e auditável',
      'Atualização contínua conforme regulamentações',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Certificação de Sistemas de IA',
    description: 'Certificamos que seus sistemas de IA atendem aos mais altos padrões éticos',
    features: [
      'Auditoria completa de ética algorítmica',
      'Detecção e mitigação de vieses',
      'Validação de transparência e explicabilidade',
      'Certificado blockchain verificável',
    ],
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Settings,
    title: 'Implementação de Ética por Design',
    description: 'Integramos princípios éticos diretamente na arquitetura do seu sistema',
    features: [
      'Arquitetura ética desde o design',
      'Privacidade por design nativa',
      'Validação contínua automatizada',
      'Monitoramento de conformidade em tempo real',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Award,
    title: 'Compliance e Governança',
    description: 'Garantimos conformidade com regulamentações globais e governança transparente',
    features: [
      'Compliance LGPD/GDPR/HIPAA',
      'Preparação para EU AI Act',
      'Governança descentralizada (DAO)',
      'Auditoria e relatórios regulares',
    ],
    color: 'from-orange-500 to-red-500',
  },
]

const certificationProcess = [
  {
    step: '01',
    title: 'Análise e Diagnóstico',
    description: 'Avaliamos seu sistema atual, identificando riscos éticos e áreas de melhoria',
    icon: Eye,
  },
  {
    step: '02',
    title: 'Desenvolvimento de Protocolos',
    description: 'Criamos protocolos éticos personalizados alinhados com seu contexto e regulamentações',
    icon: FileCheck,
  },
  {
    step: '03',
    title: 'Implementação e Integração',
    description: 'Implementamos os protocolos em sua arquitetura, garantindo ética por design',
    icon: Settings,
  },
  {
    step: '04',
    title: 'Validação e Certificação',
    description: 'Realizamos auditoria completa e emitimos certificação blockchain verificável',
    icon: Award,
  },
  {
    step: '05',
    title: 'Monitoramento Contínuo',
    description: 'Acompanhamos continuamente a conformidade e atualizamos protocolos conforme necessário',
    icon: Shield,
  },
]

const certificationBenefits = [
  {
    icon: Lock,
    title: 'Redução de Riscos',
    description: 'Minimize riscos regulatórios, legais e de reputação',
    items: [
      'Proteção contra multas e sanções',
      'Redução de litígios',
      'Proteção de reputação',
      'Conformidade proativa',
    ],
  },
  {
    icon: Users,
    title: 'Confiança e Credibilidade',
    description: 'Construa confiança com clientes, investidores e reguladores',
    items: [
      'Diferencial competitivo',
      'Aumento de confiança do cliente',
      'Atração de investimentos',
      'Reconhecimento de mercado',
    ],
  },
  {
    icon: Globe,
    title: 'Escalabilidade Global',
    description: 'Prepare-se para expansão internacional com compliance multi-jurisdicional',
    items: [
      'Conformidade global',
      'Expansão facilitada',
      'Padrões internacionais',
      'Governança transparente',
    ],
  },
]

export default function EthicalCertification() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="certificacao" ref={ref} className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-heading"
        >
          <div className="section-label mb-4">//CERTIFICAÇÃO ÉTICA</div>
          <h2 className="section-title text-5xl md:text-7xl mb-6">
            Certificação Ética de IA
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            A Symbeon oferece serviços de certificação ética e fornecimento de protocolos éticos, 
            garantindo que seus sistemas de IA atendam aos mais altos padrões de ética, transparência e conformidade
          </p>
        </motion.div>

        {/* Serviços de Certificação */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificationServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-bg-card p-8 rounded-2xl border border-[#585868]/20 hover:border-[#00d4ff]/30 transition-all group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <service.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#e8e8f0] mb-3">{service.title}</h3>
                  <p className="text-[#b8b8c8] mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
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

        {/* Processo de Certificação */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="section-heading mb-8">
            <div className="section-label mb-4">//PROCESSO</div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#e8e8f0] mb-4">
              Como Funciona a Certificação
            </h3>
            <p className="text-lg text-[#b8b8c8] max-w-3xl mx-auto">
              Um processo estruturado e transparente que garante a conformidade ética do seu sistema
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {certificationProcess.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-bg-card p-6 rounded-2xl border border-[#585868]/20 text-center"
              >
                <div className="text-6xl font-black text-gradient mb-4 opacity-20">{process.step}</div>
                <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <process.icon className="text-white" size={32} />
                </div>
                <h4 className="text-lg font-bold text-[#e8e8f0] mb-2">{process.title}</h4>
                <p className="text-[#b8b8c8] text-sm leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefícios */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="section-heading mb-8">
            <div className="section-label mb-4">//BENEFÍCIOS</div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#e8e8f0] mb-4">
              Por Que Certificar Seu Sistema?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificationBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-bg-card p-6 rounded-2xl border border-[#585868]/20"
              >
                <benefit.icon className="text-purple-400 mb-4" size={32} />
                <h4 className="text-xl font-bold text-[#e8e8f0] mb-2">{benefit.title}</h4>
                <p className="text-[#b8b8c8] mb-4 text-sm leading-relaxed">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.items.map((item, i) => (
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 md:p-12 rounded-3xl text-center text-white"
        >
          <Shield className="mx-auto mb-6" size={64} />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Certifique Seu Sistema de IA
          </h3>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Garanta que seu sistema atenda aos mais altos padrões éticos e de conformidade. 
            Entre em contato para conhecer nossos protocolos e serviços de certificação.
          </p>
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Solicitar Certificação
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

