import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sparkles, Trophy, Zap, Shield, Heart, Code, TrendingUp, FlaskConical, Brain, Users, Globe, Lock, Eye } from 'lucide-react'
import { AnalyticsEvents } from '../utils/analytics'

interface Question {
  id: string
  question: string
  options: Array<{
    text: string
    value: string
    nextQuestion?: string
    points: { [key: string]: number }
    icon?: any
  }>
  parent?: string
}

interface Profile {
  role: 'desenvolvedor' | 'investidor' | 'pesquisador' | 'parceiro'
  level: number
  points: number
  badges: string[]
  interests: string[]
  persona: string
  vision: string[]
  concerns: string[]
}

// Árvore de perguntas hierárquica
const questionTree: { [key: string]: Question } = {
  root: {
    id: 'root',
    question: 'Como você vê o futuro da Inteligência Artificial?',
    options: [
      {
        text: 'Uma ferramenta poderosa que precisa de limites éticos',
        value: 'ethical-tool',
        nextQuestion: 'ethical-concerns',
        points: { pesquisador: 8, desenvolvedor: 7 },
        icon: Shield,
      },
      {
        text: 'Uma oportunidade de negócio transformadora',
        value: 'business-opportunity',
        nextQuestion: 'business-focus',
        points: { investidor: 10, parceiro: 8 },
        icon: TrendingUp,
      },
      {
        text: 'Uma tecnologia que deve servir à humanidade',
        value: 'human-centric',
        nextQuestion: 'human-focus',
        points: { pesquisador: 9, desenvolvedor: 8 },
        icon: Heart,
      },
      {
        text: 'Uma inovação que preciso entender melhor',
        value: 'learning',
        nextQuestion: 'learning-path',
        points: { desenvolvedor: 6, pesquisador: 7 },
        icon: Brain,
      },
    ],
  },
  'ethical-concerns': {
    id: 'ethical-concerns',
    question: 'Qual sua maior preocupação com IA?',
    parent: 'root',
    options: [
      {
        text: 'Privacidade e proteção de dados',
        value: 'privacy',
        nextQuestion: 'privacy-solution',
        points: { desenvolvedor: 9, pesquisador: 8 },
        icon: Lock,
      },
      {
        text: 'Viés e discriminação algorítmica',
        value: 'bias',
        nextQuestion: 'bias-solution',
        points: { pesquisador: 10, desenvolvedor: 8 },
        icon: Eye,
      },
      {
        text: 'Transparência e explicabilidade',
        value: 'transparency',
        nextQuestion: 'transparency-solution',
        points: { pesquisador: 9, desenvolvedor: 7 },
        icon: Eye,
      },
      {
        text: 'Governança e controle',
        value: 'governance',
        nextQuestion: 'governance-solution',
        points: { investidor: 8, parceiro: 7 },
        icon: Shield,
      },
    ],
  },
  'business-focus': {
    id: 'business-focus',
    question: 'O que mais te interessa em IA para negócios?',
    parent: 'root',
    options: [
      {
        text: 'Automação e eficiência operacional',
        value: 'automation',
        nextQuestion: 'automation-scale',
        points: { investidor: 9, parceiro: 8 },
        icon: Zap,
      },
      {
        text: 'Inovação e diferenciação competitiva',
        value: 'innovation',
        nextQuestion: 'innovation-type',
        points: { investidor: 10, parceiro: 9 },
        icon: Sparkles,
      },
      {
        text: 'Compliance e redução de riscos',
        value: 'compliance',
        nextQuestion: 'compliance-focus',
        points: { investidor: 8, parceiro: 7 },
        icon: Shield,
      },
    ],
  },
  'human-focus': {
    id: 'human-focus',
    question: 'Como a IA deve servir às pessoas?',
    parent: 'root',
    options: [
      {
        text: 'Amplificando capacidades humanas',
        value: 'amplify',
        nextQuestion: 'amplify-domain',
        points: { desenvolvedor: 9, pesquisador: 8 },
        icon: Users,
      },
      {
        text: 'Respeitando diversidade cultural',
        value: 'cultural',
        nextQuestion: 'cultural-adaptation',
        points: { pesquisador: 10, desenvolvedor: 7 },
        icon: Globe,
      },
      {
        text: 'Criando conexões empáticas',
        value: 'empathy',
        nextQuestion: 'empathy-application',
        points: { pesquisador: 9, desenvolvedor: 6 },
        icon: Heart,
      },
    ],
  },
  'learning-path': {
    id: 'learning-path',
    question: 'Como você prefere aprender sobre IA?',
    parent: 'root',
    options: [
      {
        text: 'Através de código e implementação prática',
        value: 'hands-on',
        nextQuestion: 'hands-on-level',
        points: { desenvolvedor: 10, pesquisador: 6 },
        icon: Code,
      },
      {
        text: 'Através de pesquisa e estudos acadêmicos',
        value: 'academic',
        nextQuestion: 'academic-focus',
        points: { pesquisador: 10, desenvolvedor: 5 },
        icon: FlaskConical,
      },
      {
        text: 'Através de casos de uso e exemplos reais',
        value: 'use-cases',
        nextQuestion: 'use-case-type',
        points: { investidor: 8, parceiro: 9 },
        icon: TrendingUp,
      },
    ],
  },
  // Perguntas de aprofundamento
  'privacy-solution': {
    id: 'privacy-solution',
    question: 'O que é mais importante em privacidade?',
    parent: 'ethical-concerns',
    options: [
      {
        text: 'Anonimização automática de dados',
        value: 'anonymization',
        points: { desenvolvedor: 10, pesquisador: 8 },
      },
      {
        text: 'Controle do usuário sobre seus dados',
        value: 'user-control',
        points: { desenvolvedor: 8, pesquisador: 9 },
      },
      {
        text: 'Compliance regulatório (LGPD/GDPR)',
        value: 'compliance',
        points: { investidor: 9, parceiro: 8 },
      },
    ],
  },
  'bias-solution': {
    id: 'bias-solution',
    question: 'Como combater viés algorítmico?',
    parent: 'ethical-concerns',
    options: [
      {
        text: 'Validação ética automatizada',
        value: 'automated-validation',
        points: { pesquisador: 10, desenvolvedor: 9 },
      },
      {
        text: 'Diversidade em dados de treinamento',
        value: 'diverse-data',
        points: { pesquisador: 9, desenvolvedor: 8 },
      },
      {
        text: 'Auditoria contínua e transparência',
        value: 'audit',
        points: { pesquisador: 8, investidor: 7 },
      },
    ],
  },
  'transparency-solution': {
    id: 'transparency-solution',
    question: 'O que torna IA transparente?',
    parent: 'ethical-concerns',
    options: [
      {
        text: 'Explicabilidade das decisões',
        value: 'explainability',
        points: { pesquisador: 10, desenvolvedor: 8 },
      },
      {
        text: 'Código aberto e auditável',
        value: 'open-source',
        points: { desenvolvedor: 10, pesquisador: 7 },
      },
      {
        text: 'Blockchain para rastreabilidade',
        value: 'blockchain',
        points: { desenvolvedor: 9, investidor: 8 },
      },
    ],
  },
  'governance-solution': {
    id: 'governance-solution',
    question: 'Como governar IA?',
    parent: 'ethical-concerns',
    options: [
      {
        text: 'Governança descentralizada (DAO)',
        value: 'dao',
        points: { desenvolvedor: 9, investidor: 8 },
      },
      {
        text: 'Regulamentação e compliance',
        value: 'regulation',
        points: { investidor: 9, parceiro: 8 },
      },
      {
        text: 'Comunidade e código aberto',
        value: 'community',
        points: { desenvolvedor: 10, pesquisador: 8 },
      },
    ],
  },
  'automation-scale': {
    id: 'automation-scale',
    question: 'Em que escala você pensa?',
    parent: 'business-focus',
    options: [
      {
        text: 'Pequena empresa / Startup',
        value: 'startup',
        points: { desenvolvedor: 8, investidor: 7 },
      },
      {
        text: 'Média empresa em crescimento',
        value: 'growth',
        points: { investidor: 9, parceiro: 8 },
      },
      {
        text: 'Grande corporação / Enterprise',
        value: 'enterprise',
        points: { investidor: 10, parceiro: 9 },
      },
    ],
  },
  'innovation-type': {
    id: 'innovation-type',
    question: 'Que tipo de inovação busca?',
    parent: 'business-focus',
    options: [
      {
        text: 'Tecnologia disruptiva',
        value: 'disruptive',
        points: { investidor: 10, desenvolvedor: 8 },
      },
      {
        text: 'Melhoria incremental',
        value: 'incremental',
        points: { parceiro: 9, investidor: 7 },
      },
      {
        text: 'Inovação ética e responsável',
        value: 'ethical-innovation',
        points: { pesquisador: 10, desenvolvedor: 9 },
      },
    ],
  },
  'compliance-focus': {
    id: 'compliance-focus',
    question: 'Qual aspecto de compliance?',
    parent: 'business-focus',
    options: [
      {
        text: 'LGPD / GDPR',
        value: 'lgpd-gdpr',
        points: { investidor: 9, parceiro: 8 },
      },
      {
        text: 'EU AI Act',
        value: 'ai-act',
        points: { investidor: 8, pesquisador: 7 },
      },
      {
        text: 'Padrões de segurança',
        value: 'security',
        points: { desenvolvedor: 9, investidor: 7 },
      },
    ],
  },
  'amplify-domain': {
    id: 'amplify-domain',
    question: 'Em qual domínio amplificar?',
    parent: 'human-focus',
    options: [
      {
        text: 'Criatividade e inovação',
        value: 'creativity',
        points: { desenvolvedor: 8, pesquisador: 7 },
      },
      {
        text: 'Produtividade e eficiência',
        value: 'productivity',
        points: { desenvolvedor: 9, investidor: 8 },
      },
      {
        text: 'Tomada de decisão',
        value: 'decision-making',
        points: { investidor: 9, parceiro: 8 },
      },
    ],
  },
  'cultural-adaptation': {
    id: 'cultural-adaptation',
    question: 'O que é mais importante na adaptação cultural?',
    parent: 'human-focus',
    options: [
      {
        text: 'Compreensão de contexto local',
        value: 'local-context',
        points: { pesquisador: 10, desenvolvedor: 7 },
      },
      {
        text: 'Respeito a valores culturais',
        value: 'cultural-values',
        points: { pesquisador: 9, desenvolvedor: 6 },
      },
      {
        text: 'Comunicação adaptativa',
        value: 'adaptive-communication',
        points: { pesquisador: 8, desenvolvedor: 7 },
      },
    ],
  },
  'empathy-application': {
    id: 'empathy-application',
    question: 'Onde aplicar empatia em IA?',
    parent: 'human-focus',
    options: [
      {
        text: 'Atendimento ao cliente',
        value: 'customer-service',
        points: { parceiro: 9, investidor: 8 },
      },
      {
        text: 'Educação e aprendizado',
        value: 'education',
        points: { pesquisador: 9, desenvolvedor: 7 },
      },
      {
        text: 'Saúde e bem-estar',
        value: 'health',
        points: { pesquisador: 10, desenvolvedor: 6 },
      },
    ],
  },
  'hands-on-level': {
    id: 'hands-on-level',
    question: 'Qual seu nível técnico?',
    parent: 'learning-path',
    options: [
      {
        text: 'Iniciante - Quero aprender',
        value: 'beginner',
        points: { desenvolvedor: 5 },
      },
      {
        text: 'Intermediário - Já programo',
        value: 'intermediate',
        points: { desenvolvedor: 8 },
      },
      {
        text: 'Avançado - Especialista',
        value: 'advanced',
        points: { desenvolvedor: 10 },
      },
    ],
  },
  'academic-focus': {
    id: 'academic-focus',
    question: 'Qual área de pesquisa?',
    parent: 'learning-path',
    options: [
      {
        text: 'Ética em IA',
        value: 'ai-ethics',
        points: { pesquisador: 10 },
      },
      {
        text: 'Machine Learning',
        value: 'ml',
        points: { pesquisador: 8, desenvolvedor: 7 },
      },
      {
        text: 'Governança algorítmica',
        value: 'governance',
        points: { pesquisador: 9 },
      },
    ],
  },
  'use-case-type': {
    id: 'use-case-type',
    question: 'Que tipo de caso de uso?',
    parent: 'learning-path',
    options: [
      {
        text: 'Casos de sucesso reais',
        value: 'success-stories',
        points: { investidor: 9, parceiro: 8 },
      },
      {
        text: 'ROI e métricas de negócio',
        value: 'roi',
        points: { investidor: 10, parceiro: 9 },
      },
      {
        text: 'Implementação prática',
        value: 'implementation',
        points: { parceiro: 9, desenvolvedor: 8 },
      },
    ],
  },
}

const badges = {
  desenvolvedor: ['Code Master', 'Ethics Builder', 'SEVE Developer', 'Privacy Guardian'],
  investidor: ['Vision Investor', 'Tech Scout', 'Future Builder', 'Innovation Leader'],
  pesquisador: ['Research Pioneer', 'Ethics Scholar', 'Lab Collaborator', 'Thought Leader'],
  parceiro: ['Strategic Partner', 'Ecosystem Builder', 'Innovation Leader', 'Trust Builder'],
}

const personas = {
  desenvolvedor: 'Ethics-First Developer',
  investidor: 'Tech Vision Investor',
  pesquisador: 'Ethical AI Researcher',
  parceiro: 'Strategic Innovation Partner',
}

interface GamifiedOnboardingProps {
  onClose?: () => void
}

export default function GamifiedOnboarding({ onClose }: GamifiedOnboardingProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState('root')
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [profile, setProfile] = useState<Profile | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [points, setPoints] = useState<{ [key: string]: number }>({
    desenvolvedor: 0,
    investidor: 0,
    pesquisador: 0,
    parceiro: 0,
  })
  const [path, setPath] = useState<string[]>(['root'])

  const currentQuestion = questionTree[currentQuestionId]

  const handleAnswer = (option: Question['options'][0]) => {
    const newAnswers = { ...answers, [currentQuestionId]: option.value }
    setAnswers(newAnswers)

    // Calcular pontos
    const newPoints = { ...points }
    Object.entries(option.points).forEach(([role, pts]) => {
      newPoints[role as keyof typeof points] += pts
    })
    setPoints(newPoints)

    // Adicionar ao caminho
    const newPath = [...path, option.value]
    setPath(newPath)

    // Próxima pergunta ou finalizar
    if (option.nextQuestion && questionTree[option.nextQuestion]) {
      setCurrentQuestionId(option.nextQuestion)
    } else {
      // Fim da árvore - gerar perfil
      generateProfile(newPoints, newPath)
    }
  }

  const generateProfile = (
    finalPoints: typeof points,
    finalPath: string[]
  ) => {
    // Determinar role principal
    const maxRole = Object.entries(finalPoints).reduce((a, b) =>
      finalPoints[a[0] as keyof typeof points] > finalPoints[b[0] as keyof typeof points] ? a : b
    )[0] as Profile['role']

    // Calcular nível baseado em pontos e profundidade do caminho
    const totalPoints = finalPoints[maxRole]
    const depth = finalPath.length
    const level = Math.min(Math.floor(totalPoints / 10) + Math.floor(depth / 2), 5)

    // Selecionar badges
    const userBadges = badges[maxRole].slice(0, level)

    // Mapear visão e preocupações baseado nas respostas
    const vision: string[] = []
    const concerns: string[] = []
    const interests: string[] = []

    // Analisar caminho para extrair visão
    if (finalPath.includes('ethical-tool') || finalPath.includes('human-centric')) {
      vision.push('IA como ferramenta ética')
    }
    if (finalPath.includes('business-opportunity')) {
      vision.push('IA como oportunidade de negócio')
    }
    if (finalPath.includes('privacy') || finalPath.includes('anonymization')) {
      concerns.push('Privacidade')
      interests.push('Privacidade por Design')
    }
    if (finalPath.includes('bias') || finalPath.includes('automated-validation')) {
      concerns.push('Viés Algorítmico')
      interests.push('Validação Ética')
    }
    if (finalPath.includes('transparency') || finalPath.includes('open-source')) {
      concerns.push('Transparência')
      interests.push('Código Aberto')
    }
    if (finalPath.includes('governance') || finalPath.includes('dao')) {
      concerns.push('Governança')
      interests.push('Blockchain Governance')
    }
    if (finalPath.includes('cultural') || finalPath.includes('empathy')) {
      vision.push('IA empática e cultural')
      interests.push('Adaptação Cultural')
    }

    const newProfile: Profile = {
      role: maxRole,
      level,
      points: totalPoints,
      badges: userBadges,
      interests,
      persona: personas[maxRole],
      vision,
      concerns,
    }

    setProfile(newProfile)
    setShowProfile(true)

    // Salvar no localStorage
    localStorage.setItem('seve-profile', JSON.stringify(newProfile))

    // Analytics: Track onboarding completion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      AnalyticsEvents.onboardingCompleted({
        role: newProfile.role,
        level: newProfile.level,
        points: newProfile.points,
      })
    }

    // Scroll para seção personalizada após 2 segundos
    setTimeout(() => {
      const element = document.querySelector(`#${newProfile.role}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      if (onClose) {
        setTimeout(() => onClose(), 1000)
      }
    }, 2000)
  }

  const resetOnboarding = () => {
    setCurrentQuestionId('root')
    setAnswers({})
    setPoints({ desenvolvedor: 0, investidor: 0, pesquisador: 0, parceiro: 0 })
    setPath(['root'])
    setProfile(null)
    setShowProfile(false)
    localStorage.removeItem('seve-profile')
  }

  // Carregar perfil salvo
  useEffect(() => {
    const savedProfile = localStorage.getItem('seve-profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
      setShowProfile(true)
    }
  }, [])

  if (showProfile && profile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-lg flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="max-w-2xl w-full bg-bg-card rounded-3xl border border-slate-800 p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-accent opacity-10" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Trophy className="text-white" size={48} />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black mb-2 text-gradient">
                Perfil Criado!
              </h2>
              <p className="text-xl text-slate-400">{profile.persona}</p>
            </div>

            {/* Level e Points */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-bg-secondary p-6 rounded-xl border border-slate-800 text-center">
                <div className="text-4xl font-black text-gradient mb-2">Nível {profile.level}</div>
                <div className="text-sm text-slate-400">Experiência</div>
              </div>
              <div className="bg-bg-secondary p-6 rounded-xl border border-slate-800 text-center">
                <div className="text-4xl font-black text-gradient mb-2">{profile.points}pts</div>
                <div className="text-sm text-slate-400">Pontos</div>
              </div>
            </div>

            {/* Visão e Preocupações */}
            {profile.vision.length > 0 && (
              <div className="mb-6">
                <div className="text-sm text-purple-400 font-mono mb-3">//SUA VISÃO DE IA</div>
                <div className="flex flex-wrap gap-2">
                  {profile.vision.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm"
                    >
                      {v}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {profile.concerns.length > 0 && (
              <div className="mb-6">
                <div className="text-sm text-cyan-400 font-mono mb-3">//SUAS PREOCUPAÇÕES</div>
                <div className="flex flex-wrap gap-2">
                  {profile.concerns.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm"
                    >
                      {c}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="mb-8">
              <div className="text-sm text-purple-400 font-mono mb-4">//BADGES DESBLOQUEADOS</div>
              <div className="flex flex-wrap gap-3">
                {profile.badges.map((badge, i) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-4 py-2 bg-gradient-accent rounded-lg text-white font-bold text-sm"
                  >
                    {badge}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interesses */}
            {profile.interests.length > 0 && (
              <div className="mb-8">
                <div className="text-sm text-purple-400 font-mono mb-4">//SEUS INTERESSES</div>
                <div className="flex flex-wrap gap-3">
                  {profile.interests.map((interest, i) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="px-4 py-2 bg-bg-secondary border border-slate-700 rounded-lg text-slate-300"
                    >
                      {interest}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs Personalizados */}
            <div className="space-y-3">
              <motion.a
                href={`#${profile.role}`}
                whileHover={{ scale: 1.02, x: 5 }}
                className="block w-full px-6 py-4 bg-gradient-accent text-white rounded-lg font-bold text-center hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Ver Conteúdo Personalizado
                <Sparkles size={20} />
              </motion.a>
              <button
                onClick={resetOnboarding}
                className="w-full px-6 py-3 bg-bg-secondary border border-slate-700 text-slate-300 rounded-lg font-semibold hover:border-purple-500/50 transition-all"
              >
                Refazer Perfil
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (!currentQuestion) return null

  const questionNumber = path.length
  const totalQuestions = Math.max(...Object.values(questionTree).map(q => {
    let depth = 1
    let current = q
    while (current.parent) {
      depth++
      current = questionTree[current.parent]
    }
    return depth
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-lg flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-2xl w-full bg-bg-card rounded-3xl border border-slate-800 p-8 md:p-12 relative"
      >
        {/* Botão de fechar */}
        <button
          onClick={() => {
            if (onClose) onClose()
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Fechar onboarding"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {/* Header com descrição */}
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-slate-200 mb-2">
            Crie Seu Perfil Personalizado
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Responda algumas perguntas para acessar conteúdo exclusivo adaptado ao seu perfil
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Explorando sua visão de IA...</span>
            <span>{questionNumber} / ~{totalQuestions}</span>
          </div>
          <div className="w-full bg-bg-secondary rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              className="bg-gradient-accent h-2 rounded-full"
            />
          </div>
        </div>

        {/* Breadcrumb do caminho */}
        {path.length > 1 && (
          <div className="mb-6 text-xs text-slate-500 font-mono flex items-center gap-2 flex-wrap">
            {path.slice(0, -1).map((p, i) => (
              <span key={i}>
                {p.replace(/-/g, ' ')}
                {i < path.length - 2 && <span className="mx-2">/</span>}
              </span>
            ))}
          </div>
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-slate-200">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, i) => {
                const Icon = option.icon
                return (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 bg-bg-secondary border border-slate-800 rounded-xl hover:border-purple-500/50 transition-all text-left flex items-center gap-4 group"
                  >
                    {Icon && (
                      <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="text-white" size={24} />
                      </div>
                    )}
                    <span className="text-lg text-slate-200 font-semibold flex-1">
                      {option.text}
                    </span>
                    <Sparkles className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
