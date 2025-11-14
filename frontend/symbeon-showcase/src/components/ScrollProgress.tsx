/**
 * Componente ScrollProgress - Barra de progresso do scroll visual
 * Mostra % da página visualizada e permite pular para seções
 */
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ScrollProgressProps {
  color?: string
  height?: number
  showPercentage?: boolean
}

export default function ScrollProgress({
  color = 'from-cyan-500 to-purple-500',
  height = 3,
  showPercentage = true
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Barra de progresso fixa no topo */}
      <motion.div
        className={`fixed top-0 left-0 right-0 bg-gradient-to-r ${color} z-50`}
        style={{ height: `${height}px`, originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ type: 'tween', duration: 0.1 }}
      />

      {/* Percentagem flutuante */}
      {showPercentage && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 text-xs font-mono text-slate-400 bg-bg-card px-3 py-2 rounded-lg border border-slate-700/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollProgress > 0 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(scrollProgress)}%
        </motion.div>
      )}
    </>
  )
}
