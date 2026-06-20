"use client";

import Image from "next/image";
import Link from "next/link";
import { Languages, LogOut, Moon, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function PatientNavbar() {
  const { lang, isDark, toggleLang, toggleTheme } = useApp();

  const t = {
    en: {
      home: "Home",
      about: "About",
      features: "Features",
      hospitals: "Hospitals",
      doctors: "Doctors",
      dashboard: "Dashboard",
      contact: "Contact",
      logout: "Logout",
      tagline: "Wellness Within Reach",
      langBtn: "தமிழ்",
    },
    ta: {
      home: "முகப்பு",
      about: "பற்றி",
      features: "சேவைகள்",
      hospitals: "மருத்துவமனைகள்",
      doctors: "மருத்துவர்கள்",
      dashboard: "டாஷ்போர்டு",
      contact: "தொடர்பு",
      logout: "வெளியேறு",
      tagline: "ஆரோக்கியம் உங்கள் அருகில்",
      langBtn: "English",
    },
  }[lang];

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDark ? "border-white/10 bg-[#071A1C]/90" : "border-slate-200 bg-white/90"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/patient-home" className="flex items-center gap-3">
          <Image
            src="/nalam-logo.png"
            alt="Nalam Logo"
            width={56}
            height={56}
            className="rounded-xl object-contain"
            priority
          />

          <div>
            <h1 className="text-xl font-extrabold text-[#0F8B8D]">Nalam</h1>
            <p className={`text-xs font-medium ${isDark ? "text-white/70" : "text-slate-600"}`}>
              {t.tagline}
            </p>
          </div>
        </Link>

        <div
          className={`hidden items-center gap-6 text-sm font-bold md:flex ${
            isDark ? "text-white/80" : "text-slate-700"
          }`}
        >
          <Link href="/patient-home">{t.home}</Link>
          <Link href="/about">{t.about}</Link>
          <Link href="/features">{t.features}</Link>
          <Link href="/hospitals">{t.hospitals}</Link>
          <Link href="/doctors">{t.doctors}</Link>
          <Link href="/patient-dashboard">{t.dashboard}</Link>
          <Link href="/contact">{t.contact}</Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 rounded-full bg-[#E3F1F1] px-4 py-2 text-sm font-bold text-[#0F8B8D]"
          >
            <Languages size={16} />
            {t.langBtn}
          </button>

          <button
            onClick={toggleTheme}
            className="rounded-full bg-[#0F8B8D] p-3 text-white"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={logout}
            className="hidden rounded-full bg-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-md md:block"
          >
            <LogOut size={16} className="mr-1 inline" />
            {t.logout}
          </button>
        </div>
      </div>
    </nav>
  );
}