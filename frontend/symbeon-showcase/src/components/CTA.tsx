import { motion } from 'framer-motion'
import { Github, Mail, Handshake } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="contato"
      ref={ref}
      className="section-alt border-t border-b border-[#585868]/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <Handshake className="text-indigo-500 mx-auto mb-6" size={64} />
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Junte-se à Nossa Jornada
          </h2>
          <p className="text-xl text-[#b8b8c8] mb-8 max-w-2xl mx-auto">
            Se você compartilha nossa visão de tecnologia com propósito, queremos te conhecer.
            Seja como colaborador, parceiro ou membro da comunidade.
          </p>
          <p className="text-sm text-[#888898] mb-12 max-w-2xl mx-auto">
            Crie seu perfil personalizado para acessar conteúdo exclusivo e adaptado ao seu perfil
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={() => {
              const event = new CustomEvent('show-onboarding')
              window.dispatchEvent(event)
              // Analytics
              if (typeof window !== 'undefined' && (window as any).gtag) {
                const { AnalyticsEvents } = require('../utils/analytics')
                AnalyticsEvents.onboardingStarted()
                AnalyticsEvents.ctaClicked('Criar Perfil', 'CTA Section')
              }
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center justify-center gap-2"
          >
            Criar Meu Perfil Personalizado
          </motion.button>
          <motion.a
            href="#seve"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Github size={20} />
            Conhecer SEVE
          </motion.a>
          <motion.a
            href="mailto:contato@symbeon.tech"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="btn-tertiary flex items-center justify-center gap-2"
          >
            <Mail size={20} />
            Entrar em Contato
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
