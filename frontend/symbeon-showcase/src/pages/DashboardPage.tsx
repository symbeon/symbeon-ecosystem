import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Bot, Plus } from 'lucide-react'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
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
            <h1 className="text-4xl md:text-6xl font-black text-gradient mb-4">
              Dashboard
            </h1>
            <p className="text-xl text-slate-400">
              Bem-vindo, {user?.name}!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-bg-card rounded-2xl border border-slate-800 p-6"
            >
              <div className="text-3xl font-black text-gradient mb-2">0</div>
              <div className="text-slate-400">Meus Agentes</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-bg-card rounded-2xl border border-slate-800 p-6"
            >
              <div className="text-3xl font-black text-gradient mb-2">0</div>
              <div className="text-slate-400">Downloads</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-bg-card rounded-2xl border border-slate-800 p-6"
            >
              <div className="text-3xl font-black text-gradient mb-2">0</div>
              <div className="text-slate-400">Avaliações</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-bg-card rounded-3xl border border-slate-800 p-8 text-center"
          >
            <Bot className="text-purple-500 mx-auto mb-4" size={64} />
            <h3 className="text-2xl font-bold mb-4 text-slate-200">
              Você ainda não criou nenhum agente
            </h3>
            <p className="text-slate-400 mb-6">
              Comece criando seu primeiro agente de IA ético usando o SEVE Framework
            </p>
            <motion.button
              onClick={() => navigate('/builder')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-accent text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/20 transition-all flex items-center gap-3 mx-auto"
            >
              <Plus size={24} />
              Criar Primeiro Agente
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

