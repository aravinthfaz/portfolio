import { useEffect, useState } from "react";
import { Check, Palette, X } from "lucide-react";

const THEMES = [
  { id: "white", label: "White", swatch: "#f8fafc" },
  { id: "blue", label: "Blue", swatch: "#38bdf8" },
  { id: "green", label: "Green", swatch: "#34d399" },
  { id: "orange", label: "Orange", swatch: "#fb923c" },
  { id: "pink", label: "Pink", swatch: "#f472b6" },
] as const;
type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "portfolio-theme";

function storedTheme(): ThemeId {
  const saved = localStorage.getItem(STORAGE_KEY);
  return THEMES.some((t) => t.id === saved) ? (saved as ThemeId) : "blue";
}

export default function ThemePicker() {
  const [theme, setTheme] = useState<ThemeId>(storedTheme);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {open && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/95 border border-slate-700 shadow-lg shadow-slate-950/50 backdrop-blur-md">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              title={t.label}
              aria-label={`${t.label} theme`}
              aria-pressed={theme === t.id}
              className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-transform hover:scale-110 ${theme === t.id ? "border-slate-100" : "border-slate-600"}`}
              style={{ backgroundColor: t.swatch }}
            >
              {theme === t.id && <Check size={14} color="#0f172a" strokeWidth={3} />}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change color theme"
        title="Change color theme"
        className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg shadow-sky-500/25 hover:scale-105 transition-transform"
      >
        {open ? <X size={20} /> : <Palette size={20} />}
      </button>
    </div>
  );
}
