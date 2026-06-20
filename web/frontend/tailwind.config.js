/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta clara para clínica
        background: '#f8fafc',   // fondo general
        foreground: '#0f172a',   // texto principal
        muted: '#64748b',        // texto secundario
        border: '#e2e8f0',       // bordes suaves
        primary: {
          DEFAULT: '#0ea5a4',    // teal suave (marca)
          hover: '#0b8685',
          soft: '#e6f7f7',       // fondo suave del primario
        },
        accent: '#f59e0b',       // acento cálido (para CTAs secundarios)
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
