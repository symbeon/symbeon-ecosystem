import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Vision() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="visao" ref={ref} className="section-alt">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-heading"
        >
          <div className="section-label mb-4">//VISÃO</div>
          <h2 className="section-title">Nossa Visão</h2>
          <p className="section-subtitle">
            O futuro que estamos construindo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-bg-card p-8 md:p-12 rounded-3xl border border-[#585868]/20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#e8e8f0]">
              Um Mundo Onde Tecnologia e Humanidade se Harmonizam
            </h3>
            <div className="space-y-4 text-lg text-[#b8b8c8] leading-relaxed">
              <p>
                Imaginamos um futuro onde a inteligência artificial não substitui a inteligência
                humana, mas a{' '}
                <span className="text-[#6b6bff] font-semibold">amplifica</span>. Onde sistemas
                algorítmicos são{' '}
                <span className="text-[#00ff88] font-semibold">transparentes</span> e{' '}
                <span className="text-[#00d4ff] font-semibold">justos</span>, não caixas pretas
                inescrutáveis.
              </p>
              <p>
                Um futuro onde blockchain não é apenas sobre criptomoedas, mas sobre{' '}
                <span className="text-[#6b6bff] font-semibold">transparência</span>,{' '}
                <span className="text-[#00ff88] font-semibold">confiança</span> e{' '}
                <span className="text-[#00d4ff] font-semibold">governança democrática</span>.
              </p>
              <p>
                Um futuro onde cada linha de código, cada algoritmo, cada sistema que criamos
                contribui para um mundo mais{' '}
                <span className="text-[#6b6bff] font-semibold">equitativo</span>,{' '}
                <span className="text-[#00ff88] font-semibold">sustentável</span> e{' '}
                <span className="text-[#00d4ff] font-semibold">humano</span>.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-bg-card p-6 rounded-2xl border border-[#585868]/20">
              <h4 className="text-xl font-bold mb-2 text-[#e8e8f0]">Inovação Ética</h4>
              <p className="text-[#b8b8c8]">
                Tecnologia que serve ao bem comum, não apenas ao lucro
              </p>
            </div>
            <div className="bg-bg-card p-6 rounded-2xl border border-[#585868]/20">
              <h4 className="text-xl font-bold mb-2 text-[#e8e8f0]">Impacto Real</h4>
              <p className="text-[#b8b8c8]">
                Soluções que transformam vidas e comunidades de forma mensurável
              </p>
            </div>
            <div className="bg-bg-card p-6 rounded-2xl border border-[#585868]/20">
              <h4 className="text-xl font-bold mb-2 text-[#e8e8f0]">Transparência Total</h4>
              <p className="text-[#b8b8c8]">
                Nada escondido, tudo auditável, completamente aberto
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

