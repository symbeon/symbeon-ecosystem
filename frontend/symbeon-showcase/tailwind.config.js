/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#0f0f17',
        'bg-card': '#151520',
        'bg-elevated': '#1a1a28',
        'accent-primary': '#00d4ff',
        'accent-secondary': '#00ff88',
        'accent-tertiary': '#6b6bff',
        'accent-warning': '#ffaa00',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #0f0f17 0%, #151520 100%)',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Courier New', 'monospace'],
        'sans': ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

