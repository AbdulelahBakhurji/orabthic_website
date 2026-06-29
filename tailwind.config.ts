import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          950: "#f7f7f5",
          900: "#ffffff",
          800: "#efefed",
          700: "#e2e2df",
          500: "#6b6b68",
        },
        white: {
          100: "#0c0c0c",
          200: "#3d3d3a",
          300: "#6b6b68",
        },
        accent: "#0c0c0c",
        "accent-fg": "#fafaf8",
        "coming-soon": "#c8a84b",
      },
      fontFamily: {
        display: ["var(--font-geist)", "var(--font-noto-kufi)", "sans-serif"],
        body: ["var(--font-inter)", "var(--font-noto-sans)", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.6" }],
        base: ["16px", { lineHeight: "1.75" }],
        lg: ["20px", { lineHeight: "1.6" }],
        xl: ["28px", { lineHeight: "1.3" }],
        "2xl": ["40px", { lineHeight: "1.2" }],
        "3xl": ["56px", { lineHeight: "1.1" }],
        "4xl": ["72px", { lineHeight: "1.05" }],
        "5xl": ["96px", { lineHeight: "1" }],
      },
      letterSpacing: {
        display: "-0.04em",
        label: "0.12em",
        eyebrow: "0.15em",
      },
      maxWidth: {
        container: "1440px",
      },
      spacing: {
        section: "120px",
        "section-mobile": "64px",
      },
      borderRadius: {
        card: "24px",
      },
      boxShadow: {
        soft: "0 2px 24px rgba(0, 0, 0, 0.04)",
        card: "0 4px 40px rgba(0, 0, 0, 0.06)",
        elevated: "0 8px 60px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "gold-pulse": "goldPulse 2s ease-in-out infinite",
        "gold-gradient": "goldGradient 3s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        beam: "beam 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        scan: "scan 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        goldPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(200, 168, 75, 0.12)" },
          "50%": { boxShadow: "0 0 40px rgba(200, 168, 75, 0.25)" },
        },
        goldGradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.5)" },
        },
        beam: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scan: {
          "0%, 100%": { opacity: "0.2", transform: "translateY(0)" },
          "50%": { opacity: "0.6", transform: "translateY(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionDuration: {
        hover: "200ms",
        entrance: "600ms",
      },
    },
  },
  plugins: [],
};

export default config;
