import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Mail, Lock, User, AlertCircle, Github } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'register'
}

export default function LoginModal({
  isOpen,
  onClose,
  defaultMode = 'login',
}: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(defaultMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { login, register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (mode === 'forgot') {
      // Simulação de recuperação de senha
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess('Link de recuperação enviado para seu email!')
      setTimeout(() => {
        setMode('login')
        setSuccess('')
      }, 3000)
      return
    }

    if (mode === 'login') {
      const success = await login(email, password)
      if (success) {
        onClose()
        setEmail('')
        setPassword('')
      } else {
        setError('Email ou senha incorretos')
      }
    } else {
      if (!name.trim()) {
        setError('Nome é obrigatório')
        return
      }
      const success = await register(email, password, name)
      if (success) {
        onClose()
        setEmail('')
        setPassword('')
        setName('')
      } else {
        setError('Email já cadastrado')
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 min-h-screen"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-bg-card rounded-3xl border border-slate-700/50 p-8 md:p-12 w-full max-w-md relative shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-black text-gradient mb-2">
                {mode === 'login'
                  ? 'Entrar'
                  : mode === 'register'
                  ? 'Criar Conta'
                  : 'Recuperar Senha'}
              </h2>
              <p className="text-slate-400">
                {mode === 'login'
                  ? 'Acesse sua conta na Symbeon'
                  : mode === 'register'
                  ? 'Crie sua conta e comece a construir agentes de IA'
                  : 'Enviaremos um link para redefinir sua senha'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'forgot' ? (
                <div>
                  <p className="text-slate-300 mb-4">
                    Digite seu email e enviaremos um link para redefinir sua senha.
                  </p>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                      size={20}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-slate-700 rounded-lg text-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
              ) : (
                <>
                  {mode === 'register' && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Nome
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                      size={20}
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-slate-700 rounded-lg text-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                </div>
                  )}

                  <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                    size={20}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-slate-700 rounded-lg text-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                    size={20}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-slate-700 rounded-lg text-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>
                </>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                >
                  <AlertCircle size={20} />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg p-3"
                >
                  <AlertCircle size={20} />
                  <span className="text-sm">{success}</span>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-accent text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                {mode === 'login' ? 'Entrar' : mode === 'register' ? 'Criar Conta' : 'Enviar Link'}
              </button>
            </form>

            {mode === 'login' && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setMode('forgot')
                    setError('')
                  }}
                  className="text-sm text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <div className="mt-6 space-y-4">
              {/* OAuth Buttons */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-bg-card text-slate-400">Ou continue com</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => {
                    // Em produção, integrar com Google OAuth
                    setError('OAuth Google em desenvolvimento')
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 bg-bg-secondary border border-slate-700 rounded-lg text-slate-200 hover:border-purple-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    // Em produção, integrar com GitHub OAuth
                    setError('OAuth GitHub em desenvolvimento')
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 bg-bg-secondary border border-slate-700 rounded-lg text-slate-200 hover:border-purple-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <Github size={20} />
                  GitHub
                </motion.button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : mode === 'forgot' ? 'login' : 'login')
                  setError('')
                  setSuccess('')
                }}
                className="text-sm text-slate-400 hover:text-purple-400 transition-colors"
              >
                {mode === 'login'
                  ? 'Não tem conta? Criar conta'
                  : mode === 'register'
                  ? 'Já tem conta? Entrar'
                  : 'Voltar ao login'}
              </button>
            </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

