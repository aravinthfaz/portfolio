/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			slate: Object.fromEntries([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((k) => [k, `rgb(var(--slate-${k}) / <alpha-value>)`])),
  			sky: Object.fromEntries([300, 400, 500, 600].map((k) => [k, `rgb(var(--accent-${k}) / <alpha-value>)`])),
  			violet: Object.fromEntries([300, 400, 500, 600].map((k) => [k, `rgb(var(--accent2-${k}) / <alpha-value>)`])),
  			purple: { 400: 'rgb(var(--accent2-400) / <alpha-value>)' }
  		}
  	}
  },
  plugins: [import("tailwindcss-animate")],
}

