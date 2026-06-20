"use client";

import { Languages, Moon, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function TopControls() {
  const { lang, isDark, toggleLang, toggleTheme } = useApp();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggleLang}
        className="rounded-full bg-[#E3F1F1] px-4 py-2 text-sm font-bold text-[#0F8B8D]"
      >
        <Languages size={16} className="mr-1 inline" />
        {lang === "en" ? "தமிழ்" : "English"}
      </button>

      <button
        onClick={toggleTheme}
        className="rounded-full bg-[#0F8B8D] p-3 text-white"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}