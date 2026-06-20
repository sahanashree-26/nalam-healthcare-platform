"use client";

import Link from "next/link";
import { ArrowLeft, HeartPulse, Hospital, Languages, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import TopControls from "../components/TopControls";

export default function AboutPage() {
  const { lang, isDark } = useApp();

  const t = {
    en: {
      back: "Back to Home",
      label: "About Nalam",
      title: "Rural Healthcare, Reimagined.",
      desc: "Nalam connects patients, hospitals and doctors through AI-powered healthcare consultations in Tamil and English.",
      hospital: "Hospital Access",
      hospitalDesc: "Discover nearby hospitals instantly.",
      multi: "Multilingual",
      multiDesc: "Tamil and English healthcare support.",
      ai: "AI Consultation",
      aiDesc: "AI captures symptoms and prepares notes.",
      secure: "Secure Records",
      secureDesc: "Digital prescriptions and patient history.",
    },
    ta: {
      back: "முகப்புக்கு திரும்பு",
      label: "நலம் பற்றி",
      title: "கிராமப்புற சுகாதாரத்தை புதிய முறையில்.",
      desc: "நலம் நோயாளிகள், மருத்துவர்கள் மற்றும் மருத்துவமனைகளை தமிழ் மற்றும் ஆங்கில AI சுகாதார ஆலோசனை மூலம் இணைக்கிறது.",
      hospital: "மருத்துவமனை அணுகல்",
      hospitalDesc: "அருகிலுள்ள மருத்துவமனைகளை உடனே கண்டறியலாம்.",
      multi: "பலமொழி ஆதரவு",
      multiDesc: "தமிழ் மற்றும் ஆங்கில சுகாதார உதவி.",
      ai: "AI ஆலோசனை",
      aiDesc: "AI அறிகுறிகளை பதிவு செய்து குறிப்புகளை உருவாக்கும்.",
      secure: "பாதுகாப்பான பதிவுகள்",
      secureDesc: "டிஜிட்டல் மருந்து சீட்டு மற்றும் நோயாளர் வரலாறு.",
    },
  }[lang];

  return (
    <main className={`min-h-screen px-6 py-10 ${isDark ? "bg-[#071A1C] text-white" : "bg-[#F7FAFA] text-[#0F172A]"}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/patient-home"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#0F8B8D] shadow-md"
          >
            <ArrowLeft size={18} />
            {t.back}
          </Link>

          <TopControls />
        </div>

        <section className="rounded-[2rem] bg-[#0A2426] p-10 text-white">
          <p className="font-semibold text-[#FF7A59]">{t.label}</p>
          <h1 className="mt-3 text-5xl font-black">{t.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">{t.desc}</p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            [Hospital, t.hospital, t.hospitalDesc],
            [Languages, t.multi, t.multiDesc],
            [HeartPulse, t.ai, t.aiDesc],
            [ShieldCheck, t.secure, t.secureDesc],
          ].map(([Icon, title, desc]: any) => (
            <div
              key={title}
              className={`rounded-3xl border p-6 shadow-lg ${
                isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-white"
              }`}
            >
              <Icon className="text-[#0F8B8D]" />
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className={isDark ? "mt-2 text-white/70" : "mt-2 text-slate-700"}>
                {desc}
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}