import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SEVECore() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="seve" ref={ref} className="section-alt section-compact">
      <div className="container">
        {/* SEVE Lab Section - PRIMEIRO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-bg-card p-12 md:p-16 rounded-2xl border border-[#585868]/20 mb-16"
        >
          <div className="mb-8">
            <div className="section-label mb-4">//SYMBEON LAB</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#e8e8f0] mb-2">Symbeon Lab</h2>
            <p className="text-[#b8b8c8] text-lg">Laboratório de P&D em IA Ética e Protocolos de Certificação</p>
          </div>
          <p className="text-xl text-[#b8b8c8] leading-relaxed mb-6">
            O <span className="text-[#00d4ff] font-semibold">Symbeon Lab</span> é o laboratório de
            pesquisa e desenvolvimento da Symbeon, dedicado a{' '}
            <span className="text-[#00ff88] font-semibold">desenvolver e aprimorar protocolos de certificação ética</span> para sistemas de IA.
            É aqui que criamos os padrões, metodologias e processos que garantem que sistemas de IA atendam aos mais altos padrões éticos.
          </p>
          <p className="text-xl text-[#b8b8c8] leading-relaxed mb-6">
            Nossos protocolos são desenvolvidos através de pesquisa rigorosa, validação empírica e
            alinhamento com regulamentações globais (LGPD, GDPR, EU AI Act). Cada protocolo é{' '}
            <span className="text-[#6b6bff] font-semibold">personalizado para diferentes setores</span> e
            contextos, garantindo que a certificação seja relevante e aplicável.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-bg-secondary p-6 rounded-xl border border-[#585868]/20">
              <div className="text-4xl font-black text-gradient mb-2">8+</div>
              <div className="text-[#b8b8c8] text-sm">Setores com Protocolos</div>
            </div>
            <div className="bg-bg-secondary p-6 rounded-xl border border-[#585868]/20">
              <div className="text-4xl font-black text-gradient mb-2">100%</div>
              <div className="text-[#b8b8c8] text-sm">Alinhado com Regulamentações</div>
            </div>
            <div className="bg-bg-secondary p-6 rounded-xl border border-[#585868]/20">
              <div className="text-4xl font-black text-gradient mb-2">Contínuo</div>
              <div className="text-[#b8b8c8] text-sm">Aprimoramento</div>
            </div>
          </div>
        </motion.div>

        {/* SEVE Framework Section - DEPOIS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-heading mb-8"
        >
          <div className="mb-8">
            <div className="section-label mb-4">//SEVE FRAMEWORK</div>
            <motion.h2
              initial={{ opacity: 0, y: 10, letterSpacing: '0.06em', scale: 0.99 }}
              animate={isInView ? { opacity: 1, y: 0, letterSpacing: '-0.03em', scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="section-title"
            >
              SEVE — Symbiotic Ethical Vision Engine
            </motion.h2>
          </div>
          <p className="section-subtitle">
            O motor ético-simbiótico que transforma protocolos em código e garantia de conformidade
          </p>
          <p className="text-lg text-[#b8b8c8] mt-4 max-w-3xl mx-auto">
            O <span className="text-gradient font-bold">SEVE</span> é um framework modular que implementa, verifica e certifica
            protocolos éticos em sistemas de IA. Seus módulos cobrem percepção (<span className="text-[#00d4ff]">sense</span>),
            visão e explicabilidade (<span className="text-[#6b6bff]">vision</span>), empatia contextual (<span className="text-[#00ff88]">empathy</span>),
            governança e compliance (<span className="text-[#00d4ff]">ethics</span>), integração segura (<span className="text-[#6b6bff]">link</span>) e
            diretrizes de experiência humana (<span className="text-[#00ff88]">personality</span>).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-bg-card p-8 rounded-2xl border border-[#585868]/20">
              <div className="mb-6">
                <div className="section-label mb-3">//IMPLEMENTAÇÃO</div>
                <h3 className="text-2xl font-black text-[#e8e8f0]">
                  Implementação de Protocolos
                </h3>
              </div>
              <p className="text-lg text-[#b8b8c8] leading-relaxed mb-4">
                O <span className="text-gradient font-bold">SEVE Framework</span> implementa os protocolos
                desenvolvidos pelo Symbeon Lab, permitindo que projetos de IA sejam{' '}
                <span className="text-[#00d4ff] font-semibold">validados e certificados</span> de forma
                automatizada e transparente.
              </p>
              <p className="text-lg text-[#b8b8c8] leading-relaxed">
                Quando um projeto se encaixa dentro dos nossos protocolos de certificação ética, o SEVE Framework
                pode ser integrado para garantir{' '}
                <span className="text-[#00ff88] font-semibold">conformidade contínua</span> e{' '}
                <span className="text-[#00d4ff] font-semibold">certificação verificável</span>.
              </p>
            </div>

            <div className="bg-bg-card p-8 rounded-2xl border border-[#585868]/20">
              <div className="mb-6">
                <div className="section-label mb-3">//ÉTICA POR DESIGN</div>
                <h3 className="text-2xl font-black text-[#e8e8f0]">Ética por Design</h3>
              </div>
              <p className="text-lg text-[#b8b8c8] leading-relaxed">
                O framework garante que a ética esteja{' '}
                <span className="text-[#00ff88] font-semibold">integrada</span> desde o primeiro
                commit, não adicionada depois. Validação automática, transparência blockchain, privacidade nativa —
                tudo isso materializa os{' '}
                <span className="text-[#00d4ff] font-semibold">protocolos desenvolvidos pelo Symbeon Lab</span> em
                código executável.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="bg-bg-card p-8 rounded-2xl border border-[#585868]/20">
              <div className="section-label mb-4">//COMO FUNCIONA</div>
              <h4 className="text-2xl font-black mb-6 text-[#e8e8f0]">Como Funciona</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-gradient">01</span>
                  <div>
                    <span className="font-bold text-[#e8e8f0] text-lg block mb-1">Symbeon Lab desenvolve protocolos</span>
                    <p className="text-[#b8b8c8] text-sm">Protocolos éticos personalizados por setor</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-gradient">02</span>
                  <div>
                    <span className="font-bold text-[#e8e8f0] text-lg block mb-1">Projetos se alinham aos protocolos</span>
                    <p className="text-[#b8b8c8] text-sm">Sistemas que atendem aos critérios éticos</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-gradient">03</span>
                  <div>
                    <span className="font-bold text-[#e8e8f0] text-lg block mb-1">SEVE Framework é integrado</span>
                    <p className="text-[#b8b8c8] text-sm">Implementação dos protocolos no código</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-gradient">04</span>
                  <div>
                    <span className="font-bold text-[#e8e8f0] text-lg block mb-1">Certificação verificável</span>
                    <p className="text-[#b8b8c8] text-sm">Validação contínua e certificação blockchain</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-card p-8 rounded-2xl border border-[#585868]/20">
              <div className="section-label mb-4">//COMPROMISSOS TÉCNICOS</div>
              <h4 className="text-2xl font-black mb-6 text-[#e8e8f0]">Compromissos Técnicos</h4>
              <ul className="space-y-4 text-lg text-[#b8b8c8]">
                <li className="flex items-start gap-3">
                  <span className="text-[#00ff88] font-mono mt-1">→</span>
                  <span>Validação ética automatizada via blockchain</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00ff88] font-mono mt-1">→</span>
                  <span>Privacidade por design (LGPD/GDPR nativo)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00ff88] font-mono mt-1">→</span>
                  <span>Motor de empatia universal e adaptação cultural</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00ff88] font-mono mt-1">→</span>
                  <span>Governança descentralizada e transparente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00ff88] font-mono mt-1">→</span>
                  <span>Código aberto e auditável</span>
                </li>
              </ul>
            </div>

            <motion.a
              href="#certificacao"
              whileHover={{ scale: 1.02, y: -2 }}
              className="block w-full text-center px-8 py-4 bg-bg-card border border-[#00d4ff]/20 text-[#e8e8f0] rounded-xl font-semibold hover:border-[#00d4ff]/40 transition-all duration-500"
            >
              Conhecer Certificação →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
