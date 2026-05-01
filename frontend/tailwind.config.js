/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg:          "var(--terminal-bg)",
          "bg-sec":    "var(--terminal-bg-secondary)",
          border:      "var(--terminal-border)",
          green:       "var(--terminal-green)",
          cyan:        "var(--terminal-cyan)",
          yellow:      "var(--terminal-yellow)",
          red:         "var(--terminal-red)",
          purple:      "var(--terminal-purple)",
          text:        "var(--terminal-text)",
          muted:       "var(--terminal-text-muted)",
          prompt:      "var(--terminal-prompt)",
        },
        tmux: {
          bar:         "var(--tmux-statusbar)",
          active:      "var(--tmux-active-pane)",
          inactive:    "var(--tmux-inactive-pane)",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "Consolas", "monospace"],
      },
      animation: {
        blink:   "blink 1s step-end infinite",
        pulse2:  "pulse 2s cubic-bezier(.4,0,.6,1) infinite",
        scanline:"scanline 8s linear infinite",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0 } },
        scanline: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
}
