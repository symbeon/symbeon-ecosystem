import { Github, FileText, Heart } from 'lucide-react'

const footerLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/symbeon/seve-framework' },
  {
    icon: FileText,
    label: 'Documentação',
    href: 'https://github.com/symbeon/seve-framework/tree/main/docs',
  },
]

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-bg-secondary border-t border-[#585868]/20">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#b8b8c8] hover:text-[#e8e8f0] transition-colors px-4 py-2 rounded-lg hover:bg-bg-card"
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        <div className="text-center text-[#888898] text-sm">
          <p className="mb-2 flex items-center justify-center gap-2">
            <Heart className="text-red-500" size={16} />
            <span>&copy; 2025 Symbeon. Todos os direitos reservados.</span>
          </p>
          <p className="opacity-70">
            Tecnologia com Propósito • Ética por Design • Impacto Real
          </p>
        </div>
      </div>
    </footer>
  )
}
