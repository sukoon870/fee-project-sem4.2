/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./**/*.{js,html}"],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                card: "hsl(var(--card) / <alpha-value>)",
                "card-foreground":
                    "hsl(var(--card-foreground) / <alpha-value>)",
                primary: "hsl(var(--primary) / <alpha-value>)",
                "primary-foreground":
                    "hsl(var(--primary-foreground) / <alpha-value>)",
                secondary: "hsl(var(--secondary) / <alpha-value>)",
                "secondary-foreground":
                    "hsl(var(--secondary-foreground) / <alpha-value>)",
                muted: "hsl(var(--muted) / <alpha-value>)",
                "muted-foreground":
                    "hsl(var(--muted-foreground) / <alpha-value>)",
                accent: "hsl(var(--accent) / <alpha-value>)",
                "accent-foreground":
                    "hsl(var(--accent-foreground) / <alpha-value>)",
                border: "hsl(var(--border) / <alpha-value>)",
                input: "hsl(var(--input) / <alpha-value>)",
                ring: "hsl(var(--ring) / <alpha-value>)",
            },
            borderColor: {
                DEFAULT: "hsl(var(--border))",
            },
            borderRadius: {
                DEFAULT: "var(--radius)",
            },
        },
    },
    plugins: [],
};
