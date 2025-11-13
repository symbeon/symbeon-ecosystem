import { motion } from 'framer-motion'
import { Menu, X, User, LogOut, Store } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from './LoginModal'

const navLinks = [
  { name: 'Manifesto', href: '#manifesto' },
  { name: 'Prova Social', href: '#proof' },
  { name: 'SEVE', href: '#seve' },
  { name: 'Certificação', href: '#certificacao' },
  { name: 'Impacto', href: '#impacto' },
  { name: 'Contato', href: '#contato' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-lg border-b border-[#585868]/20"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gradient cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            SYMBEON
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                whileHover={{ y: -2 }}
                className="text-[#b8b8c8] hover:text-[#e8e8f0] transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            
            {/* Marketplace Link */}
            <motion.a
              href="/marketplace"
              whileHover={{ y: -2 }}
              className="text-[#b8b8c8] hover:text-[#e8e8f0] transition-colors flex items-center gap-2"
            >
              <Store size={18} />
              Marketplace
            </motion.a>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <motion.a
                  href="/dashboard"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 text-[#b8b8c8] hover:text-[#e8e8f0] transition-colors"
                >
                  <User size={18} />
                  <span className="text-sm">{user?.name}</span>
                </motion.a>
                <motion.button
                  onClick={logout}
                  whileHover={{ y: -2 }}
                  className="text-[#b8b8c8] hover:text-[#ffaa00] transition-colors flex items-center gap-2"
                >
                  <LogOut size={18} />
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={() => setLoginModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-accent text-white rounded-lg font-semibold text-sm"
              >
                Entrar
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#b8b8c8] hover:text-[#e8e8f0]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className="block text-[#b8b8c8] hover:text-[#e8e8f0] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
      
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </motion.header>
  )
}
