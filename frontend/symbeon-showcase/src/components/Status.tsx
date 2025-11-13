import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const statusItems = [
  { number: '100%', label: 'Framework Completo' },
  { number: '3', label: 'Artigos Acadêmicos', sublabel: '(arXiv ready)' },
  { number: '2', label: 'Patentes em Preparação', sublabel: '(INPI)' },
  { number: '50+', label: 'Documentos Técnicos' },
  { number: '95%+', label: 'Cobertura de Testes' },
  { number: '8+', label: 'Domain Adapters', sublabel: '(Universal)' },
  { number: '5', label: 'Módulos Core', sublabel: '(Funcionais)' },
  { number: '6', label: 'Áreas de Pesquisa', sublabel: '(Ativas)' },
]

export default function Status() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="status" ref={ref} className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Status do Laboratório
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Infraestrutura, recursos e conquistas atuais
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {statusItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-bg-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all text-center group"
            >
              <div className="text-5xl font-black mb-2 text-gradient group-hover:scale-110 transition-transform">
                {item.number}
              </div>
              <div className="text-slate-300 font-semibold mb-1">{item.label}</div>
              {item.sublabel && (
                <div className="text-xs text-slate-500">{item.sublabel}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

