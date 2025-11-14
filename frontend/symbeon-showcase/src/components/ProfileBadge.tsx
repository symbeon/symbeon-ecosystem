import { AnimatePresence, motion } from 'framer-motion'
import { Trophy, Sparkles, ChevronDown, ChevronUp, Target } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

interface Profile {
  role: string
  level: number
  points: number
  badges: string[]
  persona: string
  vision?: string[]
  concerns?: string[]
}

export default function ProfileBadge() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [showBadge, setShowBadge] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedProfile = localStorage.getItem('seve-profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
      setShowBadge(true)
      setIsOpen(false)
    }
  }, [])

  if (!showBadge || !profile) return null

  const nextLevelTarget = Math.max((profile.level + 1) * 10, profile.points)
  const progressPercent = Math.min(
    100,
    Math.round((profile.points / nextLevelTarget) * 100)
  )

  const suggestions = useMemo(() => {
    const ideas: Record<string, string[]> = {
      'Ethical AI Researcher': [
        'Explorar o manifesto e conectar descobertas com o framework SEVE',
        'Validar um módulo SEVE em cenário de pesquisa real',
        'Compartilhar insights éticos com a comunidade Symbeon',
      ],
      'AI Governance Strategist': [
        'Mapear stakeholders para uma certificação ética piloto',
        'Desenhar indicadores de governança para a SEVE DAO',
        'Conectar parceiros interessados em licenciamento ético',
      ],
      'Impact Architect': [
        'Criar um caso de uso ESG utilizando métricas SEVE',
        'Identificar parcerias sociais para onboarding',
        'Preparar pitch com impacto mensurável',
      ],
    }

    return ideas[profile.persona] ?? [
      'Completar o onboarding para desbloquear mais desafios',
      'Explorar módulos críticos do SEVE Framework',
      'Registrar feedback para evoluir a gamificação',
    ]
  }, [profile.persona])

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <motion.button
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        whileHover={{ scale: 1.03, y: -4 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-bg-card border border-slate-800/60 hover:border-purple-500/40 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 transition-all"
        aria-expanded={isOpen}
        aria-label="Abrir painel de gamificação"
      >
        <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-inner">
          <Trophy className="text-white" size={20} />
        </div>
        <div className="text-left">
          <div className="text-xs text-purple-400 font-mono">//PROGRESSO</div>
          <div className="text-sm font-semibold text-slate-100">Nível {profile.level}</div>
          <div className="mt-1 w-40 bg-slate-800/60 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-accent"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {profile.points} pts • Próximo nível em {Math.max(nextLevelTarget - profile.points, 0)} pts
          </div>
        </div>
        {isOpen ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronUp size={18} className="text-slate-400" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="profile-details"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="bg-bg-card/95 backdrop-blur border border-slate-800 rounded-2xl p-5 shadow-2xl max-w-sm w-full"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-purple-400 font-mono mb-1">//PERFIL ATIVO</div>
                <div className="text-base font-semibold text-slate-100">{profile.persona}</div>
                <div className="text-xs text-slate-400">{profile.role}</div>
              </div>
              <div className="flex gap-1">
                {profile.badges.slice(0, 3).map((badge, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center shadow"
                    title={badge}
                  >
                    <Sparkles className="text-white" size={14} />
                  </div>
                ))}
              </div>
            </div>

            {profile.vision && profile.vision.length > 0 && (
              <div className="mt-4">
                <div className="text-xs text-purple-400 font-mono mb-1">//VISÃO</div>
                <div className="text-sm text-slate-200 leading-relaxed">{profile.vision[0]}</div>
              </div>
            )}
            {profile.concerns && profile.concerns.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-cyan-400 font-mono mb-1">//FOCO</div>
                <div className="text-sm text-slate-200 leading-relaxed">{profile.concerns[0]}</div>
              </div>
            )}

            <div className="mt-5 border border-slate-800 rounded-xl p-4 bg-bg-secondary/60">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-100 mb-3">
                <Target size={16} className="text-gradient" />
                Próxima Missão
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                {suggestions.slice(0, 2).map((tip, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-[#00ff88] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const event = new CustomEvent('show-onboarding')
                  window.dispatchEvent(event)
                }}
                className="px-4 py-2 bg-gradient-accent text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
              >
                Refazer Jornada
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('seve-profile')
                  setProfile(null)
                  setShowBadge(false)
                }}
                className="px-4 py-2 bg-bg-secondary border border-slate-700 rounded-lg text-sm text-slate-300 hover:border-purple-500/40 transition-all"
              >
                Reiniciar progresso
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

