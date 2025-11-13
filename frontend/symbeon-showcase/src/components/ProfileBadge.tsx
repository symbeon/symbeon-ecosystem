import { motion } from 'framer-motion'
import { Trophy, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const savedProfile = localStorage.getItem('seve-profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
      setShowBadge(true)
    }
  }, [])

  if (!showBadge || !profile) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-20 right-4 z-40 bg-bg-card border border-slate-800 rounded-xl p-4 shadow-2xl max-w-xs"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
          <Trophy className="text-white" size={20} />
        </div>
        <div>
          <div className="text-xs text-purple-400 font-mono">//SEU PERFIL</div>
          <div className="text-sm font-bold text-slate-200">{profile.persona}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-2xl font-black text-gradient">Nível {profile.level}</div>
          <div className="text-xs text-slate-400">{profile.points} pontos</div>
        </div>
        <div className="flex gap-1">
          {profile.badges.slice(0, 3).map((badge, i) => (
            <div
              key={i}
              className="w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center"
              title={badge}
            >
              <Sparkles className="text-white" size={12} />
            </div>
          ))}
        </div>
      </div>

      {/* Visão e Preocupações (se existirem) */}
      {profile.vision && profile.vision.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-purple-400 font-mono mb-1">//VISÃO</div>
          <div className="text-xs text-slate-300">{profile.vision[0]}</div>
        </div>
      )}
      {profile.concerns && profile.concerns.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-cyan-400 font-mono mb-1">//FOCO</div>
          <div className="text-xs text-slate-300">{profile.concerns[0]}</div>
        </div>
      )}

      <button
        onClick={() => {
          localStorage.removeItem('seve-profile')
          window.location.reload()
        }}
        className="w-full text-xs text-slate-400 hover:text-slate-200 transition-colors"
      >
        Refazer perfil
      </button>
    </motion.div>
  )
}

