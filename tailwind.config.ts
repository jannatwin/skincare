import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#A0849D",
                    light: "#B89BB5",
                    dark: "#8B7A8F",
                },
                secondary: {
                    DEFAULT: "#D3B3B8",
                    light: "#E5D4D7",
                    dark: "#C19FA5",
                },
                lavender: {
                    light: "#E3DAE7",
                    pale: "#EEECF3",
                },
                rosegold: "#C9A0A0",
                cream: "#FAF8F5",
                accent: {
                    pink: "#F5C6CB",
                    rose: "#E8B4BC",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                serif: ["var(--font-playfair)", "Georgia", "serif"],
            },
            boxShadow: {
                soft: "0 2px 15px rgba(160, 132, 157, 0.1)",
                medium: "0 4px 20px rgba(160, 132, 157, 0.15)",
                large: "0 8px 30px rgba(160, 132, 157, 0.2)",
                glow: "0 0 20px rgba(201, 160, 160, 0.3)",
            },
            borderRadius: {
                soft: "12px",
                medium: "16px",
                large: "24px",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.6s ease-out",
                "scale-in": "scaleIn 0.4s ease-out",
                float: "float 3s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
