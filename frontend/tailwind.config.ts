import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg:         '#0d1117',
          secondary:  '#161b22',
          border:     '#30363d',
          green:      '#39d353',
          cyan:       '#56d8f5',
          yellow:     '#d8b151',
          red:        '#f85149',
          purple:     '#bc8cff',
          text:       '#c9d1d9',
          muted:      '#8b949e',
          prompt:     '#39d353',
        },
        tmux: {
          statusbar: '#1c2128',
          active:    '#0d1117',
          inactive:  '#161b22',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        blink:     'blink 1s step-end infinite',
        scanline:  'scanline 8s linear infinite',
        typewrite: 'typewrite 0.05s steps(1) forwards',
      },
      keyframes: {
        blink:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        scanline: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
      },
    },
  },
  plugins: [],
} satisfies Config
