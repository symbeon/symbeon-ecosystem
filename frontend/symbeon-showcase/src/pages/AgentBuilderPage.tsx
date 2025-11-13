import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Bot, Save, Play } from 'lucide-react'

export default function AgentBuilderPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="pt-16 min-h-screen">
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-gradient mb-4">
                  Construtor de Agentes
                </h1>
                <p className="text-xl text-slate-400">
                  Crie agentes de IA éticos usando a arquitetura SEVE
                </p>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-bg-card border border-slate-700 text-slate-300 rounded-lg font-semibold flex items-center gap-2"
                >
                  <Save size={20} />
                  Salvar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-accent text-white rounded-lg font-semibold flex items-center gap-2"
                >
                  <Play size={20} />
                  Testar
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-bg-card rounded-3xl border border-slate-800 p-8 md:p-12"
          >
            <div className="text-center py-24">
              <Bot className="text-purple-500 mx-auto mb-6" size={80} />
              <h3 className="text-2xl font-bold mb-4 text-slate-200">
                Construtor Visual em Desenvolvimento
              </h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Estamos construindo uma interface visual intuitiva para criar agentes de IA
                usando os módulos do SEVE Framework. Em breve você poderá:
              </p>
              <ul className="text-left max-w-md mx-auto space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Selecionar módulos SEVE para seu agente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Configurar parâmetros éticos e de privacidade</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Testar e validar seu agente em tempo real</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Publicar no marketplace com um clique</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

