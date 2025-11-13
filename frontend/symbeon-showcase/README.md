# 🔬 SEVE Lab - Showcase Portal

Portal moderno de apresentação do SEVE Lab (Laboratório de P&D em IA Ética) construído com **Vite + React + TypeScript + Tailwind CSS + Framer Motion**.

---

## 🚀 **Desenvolvimento Local**

### **Pré-requisitos**
- Node.js 18+ e npm

### **Instalação e Execução**

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

O portal estará disponível em `http://localhost:5173`

---

## 🛠️ **Stack Tecnológica**

- **Vite**: Build tool ultra-rápido
- **React 18**: Framework UI
- **TypeScript**: Type safety
- **Tailwind CSS**: Estilização utilitária
- **Framer Motion**: Animações fluidas
- **Lucide React**: Ícones modernos

---

## 📦 **Estrutura do Projeto**

```
showcase/
├── src/
│   ├── components/        # Componentes React
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── SEVECore.tsx
│   │   ├── Research.tsx
│   │   ├── Publications.tsx
│   │   ├── Status.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Entry point
│   └── index.css          # Estilos globais (Tailwind)
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 **Deploy**

### **Opção 1: Vercel (Recomendado - Grátis)**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd showcase
vercel

# Ou conectar via GitHub (automático)
```

### **Opção 2: GitHub Pages**

1. **Build do projeto**:
```bash
npm run build
```

2. **Configurar GitHub Actions** (já existe em `.github/workflows/pages.yml`)

3. **Ativar GitHub Pages**:
   - Settings → Pages
   - Source: GitHub Actions

### **Opção 3: Netlify**

```bash
# Build
npm run build

# Deploy manual ou conectar repositório
```

---

## 🎨 **Customização**

### **Cores e Tema**

Editar `tailwind.config.js`:

```js
colors: {
  'bg-primary': '#0a0e27',
  'accent-primary': '#6366f1',
  // ...
}
```

### **Conteúdo**

- **Seções**: Editar componentes em `src/components/`
- **Dados**: Arrays de dados estão nos componentes (ex: `researchAreas` em `Research.tsx`)
- **Links**: Atualizar URLs nos componentes

### **Animações**

Animações usando Framer Motion podem ser ajustadas nos componentes:

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  // ...
/>
```

---

## 📱 **Responsivo**

O portal é totalmente responsivo:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1919px)
- ✅ Mobile (320px - 767px)

---

## 🔗 **Links Úteis**

- **GitHub**: https://github.com/symbeon/seve-framework
- **Documentação**: `/docs`
- **Pitch Deck**: `/docs/pitch/PITCH_DECK.md`
- **Executive Summary**: `/docs/executive/EXECUTIVE_SUMMARY.md`

---

## 🎯 **Features**

- ✨ Animações suaves com Framer Motion
- 🎨 Design moderno com Tailwind CSS
- 📱 Totalmente responsivo
- ⚡ Performance otimizada (Vite)
- 🔍 Type-safe com TypeScript
- 🌙 Dark mode nativo
- 🎭 Scroll animations
- 🎪 Hover effects interativos

---

**Última Atualização**: 11 de Novembro de 2025
