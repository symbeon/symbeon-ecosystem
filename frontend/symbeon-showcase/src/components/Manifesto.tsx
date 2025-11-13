import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const principles = [
  {
    title: 'Humanidade em Primeiro Lugar',
    description:
      'Acreditamos que toda tecnologia deve servir ao bem-estar humano. Nossas soluções são projetadas para amplificar o potencial humano, não substituí-lo.',
  },
  {
    title: 'Ética como Fundação',
    description:
      'A ética não é um adendo, é a base. Construímos sistemas que são transparentes, justos e responsáveis desde o primeiro commit. O SEVE Framework é a materialização desta crença.',
  },
  {
    title: 'Sustentabilidade Real',
    description:
      'Entendemos que tecnologia e sustentabilidade não são opostos. Criamos soluções que respeitam o planeta e promovem o bem-estar social.',
  },
  {
    title: 'Inovação com Propósito',
    description:
      'Não inovamos por inovar. Cada avanço tecnológico tem um propósito claro: resolver problemas reais e criar valor duradouro. O SEVE Framework é nossa ferramenta para isso.',
  },
]

export default function Manifesto() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="manifesto" ref={ref} className="section section-compact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-heading"
        >
          <div className="section-label mb-6">//MANIFESTO</div>
          <motion.h2
            initial={{ opacity: 0, y: 10, letterSpacing: '0.06em', scale: 0.99 }}
            animate={isInView ? { opacity: 1, y: 0, letterSpacing: '-0.03em', scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="section-title"
          >
            Nosso Manifesto
          </motion.h2>
          <p className="section-subtitle">
            Vivemos em uma era de transformação tecnológica sem precedentes. A inteligência
            artificial, blockchain e outras tecnologias emergentes têm o poder de moldar nosso
            futuro de formas profundas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-bg-card p-12 md:p-16 rounded-2xl border border-[#585868]/20">
            <p className="text-xl md:text-2xl text-[#e8e8f0] leading-relaxed mb-8">
              Na <span className="text-gradient font-bold">Symbeon</span>, acreditamos que este
              poder vem com uma responsabilidade imensa. Não podemos simplesmente criar tecnologia
              porque podemos. Devemos criar porque{' '}
              <span className="text-[#00d4ff] font-semibold">devemos</span> — porque há um
              propósito maior, uma visão de um mundo melhor.
            </p>
            <p className="text-xl md:text-2xl text-[#e8e8f0] leading-relaxed mb-8">
              O <span className="text-[#00ff88] font-semibold">SEVE Framework</span> é nossa
              resposta técnica a este compromisso. É através dele que transformamos nossos valores
              em código, nossa visão em realidade, nosso manifesto em{' '}
              <span className="text-[#00d4ff] font-semibold">ação</span>.
            </p>
            <p className="text-xl md:text-2xl text-[#e8e8f0] leading-relaxed">
              Este manifesto é nosso compromisso público: construir tecnologia que{' '}
              <span className="text-[#00ff88] font-semibold">eleva</span>, não degrada; que{' '}
              <span className="text-[#00d4ff] font-semibold">liberta</span>, não aprisiona; que{' '}
              <span className="text-[#6b6bff] font-semibold">une</span>, não divide.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: 0.4 + index * 0.1, 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <div className="bg-bg-card p-8 rounded-xl border border-[#585868]/20 hover:border-[#00d4ff]/20 transition-all duration-500 h-full">
                <h3 className="text-2xl font-black mb-4 text-[#e8e8f0] leading-tight">{principle.title}</h3>
                <p className="text-[#b8b8c8] leading-relaxed text-lg">{principle.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
