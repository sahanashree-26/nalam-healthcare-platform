"use client";

import Link from "next/link";
import { Mic } from "lucide-react";
import PatientNavbar from "../components/PatientNavbar";
import { useApp } from "../context/AppContext";

export default function PatientHome() {
  const { lang, isDark } = useApp();

  const text = {
    en: {
      badge: "AI-powered rural healthcare platform",
      title1: "Healthcare in your",
      title2: "own language",
      title3: "from anywhere.",
      desc: "Nalam helps patients find nearby hospitals, connect with trusted doctors, speak symptoms in Tamil or English, and receive digital prescriptions.",
      hospitals: "Explore Hospitals",
      doctors: "Find Doctors",
      aiNotes: "AI Doctor Notes",
      voiceSummary: "Voice Summary",
      voice: "Patient Voice",
      converting: "AI converting...",
      notes: "Doctor Notes",
      fever: "Fever for 3 days",
      headache: "Headache and body pain",
      language: "Language: Tamil",
      consult: "Suggested consult: General Physician",
    },
    ta: {
      badge: "AI உதவியுடன் கிராமப்புற சுகாதார தளம்",
      title1: "உங்கள்",
      title2: "மொழியிலேயே",
      title3: "எங்கிருந்தும் சுகாதாரம்.",
      desc: "நலம் நோயாளிகளுக்கு அருகிலுள்ள மருத்துவமனைகளை கண்டறிய, நம்பகமான மருத்துவர்களை அணுக, தமிழ் அல்லது ஆங்கிலத்தில் அறிகுறிகளை பகிர, டிஜிட்டல் மருந்து சீட்டை பெற உதவுகிறது.",
      hospitals: "மருத்துவமனைகள்",
      doctors: "மருத்துவர்கள்",
      aiNotes: "AI மருத்துவர் குறிப்புகள்",
      voiceSummary: "குரல் சுருக்கம்",
      voice: "நோயாளர் குரல்",
      converting: "AI மாற்றுகிறது...",
      notes: "மருத்துவர் குறிப்புகள்",
      fever: "3 நாட்களாக காய்ச்சல்",
      headache: "தலைவலி மற்றும் உடல் வலி",
      language: "மொழி: தமிழ்",
      consult: "பரிந்துரை: பொது மருத்துவர்",
    },
  };

  const t = text[lang];

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-[#071A1C] text-white" : "bg-[#F7FAFA] text-[#0F172A]"
      }`}
    >
      <PatientNavbar />

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute right-[-120px] top-[-120px] h-96 w-96 rounded-full bg-[#0F8B8D]/10" />
        <div className="absolute bottom-[-100px] left-[-100px] h-80 w-80 rounded-full bg-[#FF7A59]/10" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-[#E3F1F1] px-4 py-2 text-sm font-bold text-[#0F8B8D]">
              {t.badge}
            </div>

            <h2
              className={`text-5xl font-black leading-tight md:text-6xl ${
                isDark ? "text-white" : "text-[#0A2426]"
              }`}
            >
              {t.title1}{" "}
              <span className="text-[#0F8B8D]">{t.title2}</span>, {t.title3}
            </h2>

            <p
              className={`mt-6 max-w-xl text-lg font-medium leading-8 ${
                isDark ? "text-white/75" : "text-slate-700"
              }`}
            >
              {t.desc}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/hospitals"
                className="rounded-full bg-[#0F8B8D] px-8 py-4 font-bold text-white shadow-lg"
              >
                {t.hospitals}
              </Link>

              <Link
                href="/doctors"
                className="rounded-full border-2 border-[#0F8B8D] px-8 py-4 font-bold text-[#0F8B8D]"
              >
                {t.doctors}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#0A2426] p-6 text-white shadow-2xl">
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white/70">
                    {t.aiNotes}
                  </p>
                  <h3 className="text-2xl font-bold">{t.voiceSummary}</h3>
                </div>
                <Mic className="text-[#FF7A59]" />
              </div>

              <div className="rounded-2xl bg-white p-4 text-[#0F172A]">
                <p className="text-sm font-bold text-[#0F8B8D]">{t.voice}</p>
                <p className="mt-2 text-sm font-medium text-slate-700">
                  “எனக்கு மூன்று நாளாக காய்ச்சல், தலைவலி இருக்கு...”
                </p>
              </div>

              <div className="my-5 flex justify-center">
                <div className="rounded-full bg-[#FF7A59]/20 px-4 py-2 text-sm font-bold text-[#FFB199]">
                  {t.converting}
                </div>
              </div>

              <div className="rounded-2xl bg-[#E3F1F1] p-4 text-[#0F172A]">
                <p className="text-sm font-bold">{t.notes}</p>
                <ul className="mt-3 space-y-2 text-sm font-medium text-slate-800">
                  <li>• {t.fever}</li>
                  <li>• {t.headache}</li>
                  <li>• {t.language}</li>
                  <li>• {t.consult}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}