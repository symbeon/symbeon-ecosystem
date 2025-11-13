import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { AnalyticsEvents } from '../utils/analytics'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

// Componente de animação: Código Genético + Dados (Fusão Humano-Máquina)
function GeneticDataFusion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Sequências de DNA (A, T, C, G)
    const dnaBases = ['A', 'T', 'C', 'G']
    const binaryData = ['0', '1']
    const codeChars = ['{', '}', '(', ')', '[', ']', '=', '>', '<', ';']

    // Partículas de DNA
    const dnaParticles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      base: string
      opacity: number
      size: number
    }> = []

    // Partículas de dados/código
    const dataParticles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      char: string
      opacity: number
      size: number
      type: 'binary' | 'code'
    }> = []

    // Criar partículas de DNA
    for (let i = 0; i < 30; i++) {
      dnaParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        base: dnaBases[Math.floor(Math.random() * dnaBases.length)],
        opacity: Math.random() * 0.4 + 0.3,
        size: Math.random() * 12 + 10,
      })
    }

    // Criar partículas de dados
    for (let i = 0; i < 40; i++) {
      const isBinary = Math.random() > 0.5
      dataParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        char: isBinary
          ? binaryData[Math.floor(Math.random() * binaryData.length)]
          : codeChars[Math.floor(Math.random() * codeChars.length)],
        opacity: Math.random() * 0.5 + 0.4,
        size: Math.random() * 10 + 8,
        type: isBinary ? 'binary' : 'code',
      })
    }

    // Helix DNA central (representando fusão)
    const helixCenter = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      rotation: 0,
      radius: 100,
    }

    function drawDNAHelix(centerX: number, centerY: number, radius: number, rotation: number) {
      if (!ctx) return
      
      const segments = 20
      const helixHeight = 200

      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 4 + rotation
        const y = centerY + (i / segments - 0.5) * helixHeight
        const x1 = centerX + Math.cos(angle) * radius
        const x2 = centerX - Math.cos(angle) * radius

        // Linhas da hélice
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 + Math.sin(angle) * 0.2})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Bases conectando as hélices
        if (i % 2 === 0) {
          ctx.beginPath()
          ctx.moveTo(x1, y)
          ctx.lineTo(x2, y)
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.2})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Rotacionar hélice
      helixCenter.rotation += 0.01

      // Desenhar hélice DNA central
      drawDNAHelix(helixCenter.x, helixCenter.y, helixCenter.radius, helixCenter.rotation)

      // Atualizar e desenhar partículas de DNA
      dnaParticles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Borda
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Desenhar base de DNA
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = '#8b5cf6' // Roxo (DNA)
        ctx.font = `${particle.size}px monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(particle.base, particle.x, particle.y)
        ctx.restore()
      })

      // Atualizar e desenhar partículas de dados
      dataParticles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Borda
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Desenhar caractere de dados
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.type === 'binary' ? '#06b6d4' : '#6366f1' // Ciano (binary) ou Índigo (code)
        ctx.font = `${particle.size}px monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(particle.char, particle.x, particle.y)
        ctx.restore()
      })

      // Conectar DNA com dados (fusão)
      dnaParticles.forEach((dnaParticle) => {
        dataParticles.forEach((dataParticle) => {
          const dx = dnaParticle.x - dataParticle.x
          const dy = dnaParticle.y - dataParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(dnaParticle.x, dnaParticle.y)
            ctx.lineTo(dataParticle.x, dataParticle.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      helixCenter.x = canvas.width / 2
      helixCenter.y = canvas.height / 2
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-label="Animação representando a fusão entre código genético humano (DNA) e dados digitais, simbolizando a simbiose humano-máquina da Symbeon"
      role="img"
    />
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#0f0f17] to-[#151520]"
    >
      {/* Animated Genetic Data Fusion (Human-Machine Symbiosis) */}
      <GeneticDataFusion />

      {/* Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(139,92,246,0.2),transparent_50%)]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="text-sm text-white/60 mb-8 font-mono tracking-wider"
        >
          //ETHICS-FIRST AI YOU CAN DEPLOY
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-7xl md:text-9xl font-black mb-8 text-white leading-none"
        >
          SYMBEON
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-4xl mb-4 text-white/90 font-light"
        >
          Tecnologia com Propósito
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-12 text-white/70 max-w-3xl mx-auto leading-relaxed font-light"
        >
          SEVE — Symbiotic Ethical Vision Engine: Core tecnológico para IA ética em produção
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={() => {
                const event = new CustomEvent('show-onboarding')
                window.dispatchEvent(event)
                // Analytics
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  AnalyticsEvents.onboardingStarted()
                }
              }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center gap-2 group"
              aria-label="Criar meu perfil gamificado e acessar conteúdo personalizado"
            >
              Criar Meu Perfil
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} aria-hidden="true" />
            </motion.button>

            <motion.a
              href="#manifesto"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary flex items-center gap-2 group"
            >
              Explorar Agora
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.a>
          </div>
          <motion.p
            variants={itemVariants}
            className="text-sm text-white/50 text-center"
          >
            Acesse conteúdo personalizado e exclusivo
          </motion.p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-white/60 font-mono"
        >
          <a href="#participar" className="hover:text-white transition-colors">
            //DESENVOLVEDOR
          </a>
          <a href="#participar" className="hover:text-white transition-colors">
            //INVESTIDOR
          </a>
          <a href="#participar" className="hover:text-white transition-colors">
            //PESQUISADOR
          </a>
          <a href="#participar" className="hover:text-white transition-colors">
            //PARCEIRO
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
