"use client";

import Link from "next/link";
import { Brain, Video, ArrowLeft } from "lucide-react";

import PatientNavbar from "../components/PatientNavbar";
import { useApp } from "../context/AppContext";

export default function ConsultationTypePage() {
  const { lang, isDark } = useApp();

  const t =
    lang === "en"
      ? {
          back: "Back to Payment",
          label: "Choose Consultation Type",
          title: "How would you like to consult the doctor?",
          desc: "Select AI consultation or video consultation after payment.",
          aiTitle: "AI Consultation",
          aiDesc:
            "Speak your symptoms in Tamil or English. Nalam AI prepares notes and sends them to the doctor.",
          aiBtn: "Continue to AI Consultation",
          videoTitle: "Video Consultation",
          videoDesc:
            "Book and attend a video appointment with the doctor using camera and microphone.",
          videoBtn: "Join Video Consultation",
        }
      : {
          back: "கட்டணப் பக்கத்திற்கு திரும்பு",
          label: "ஆலோசனை வகையை தேர்வு செய்க",
          title: "மருத்துவரை எவ்வாறு அணுக விரும்புகிறீர்கள்?",
          desc: "கட்டணம் செலுத்திய பிறகு AI அல்லது வீடியோ ஆலோசனையை தேர்வு செய்யுங்கள்.",
          aiTitle: "AI ஆலோசனை",
          aiDesc:
            "உங்கள் அறிகுறிகளை தமிழ் அல்லது ஆங்கிலத்தில் கூறுங்கள். AI குறிப்புகளை உருவாக்கி மருத்துவருக்கு அனுப்பும்.",
          aiBtn: "AI ஆலோசனைக்கு தொடரவும்",
          videoTitle: "வீடியோ ஆலோசனை",
          videoDesc:
            "கேமரா மற்றும் மைக்ரோஃபோன் மூலம் மருத்துவருடன் வீடியோ ஆலோசனை பெறுங்கள்.",
          videoBtn: "வீடியோ ஆலோசனையில் சேர",
        };

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-[#071A1C] text-white" : "bg-[#F7FAFA] text-[#0F172A]"
      }`}
    >
      <PatientNavbar />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/payment"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#0F8B8D] shadow-md"
        >
          <ArrowLeft size={18} />
          {t.back}
        </Link>

        <section className="rounded-[2rem] bg-[#0A2426] p-10 text-white">
          <p className="font-bold text-[#FF7A59]">{t.label}</p>

          <h1 className="mt-3 text-4xl font-black">
            {t.title}
          </h1>

          <p className="mt-4 text-white/70">
            {t.desc}
          </p>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <Link
            href="/appointment"
            className={`rounded-[2rem] border-2 p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
              isDark
                ? "border-white/10 bg-white/10"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E3F1F1] text-[#0F8B8D]">
              <Brain size={42} />
            </div>

            <h2
              className={`mt-6 text-3xl font-black ${
                isDark ? "text-white" : "text-[#0A2426]"
              }`}
            >
              {t.aiTitle}
            </h2>

            <p
              className={`mt-4 font-semibold ${
                isDark ? "text-white/70" : "text-slate-700"
              }`}
            >
              {t.aiDesc}
            </p>

            <div className="mt-6 rounded-2xl bg-[#0F8B8D] py-4 text-center font-bold text-white">
              {t.aiBtn}
            </div>
          </Link>

          <Link
            href="/video-consultation"
            className={`rounded-[2rem] border-2 p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
              isDark
                ? "border-white/10 bg-white/10"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFF0EB] text-[#FF7A59]">
              <Video size={42} />
            </div>

            <h2
              className={`mt-6 text-3xl font-black ${
                isDark ? "text-white" : "text-[#0A2426]"
              }`}
            >
              {t.videoTitle}
            </h2>

            <p
              className={`mt-4 font-semibold ${
                isDark ? "text-white/70" : "text-slate-700"
              }`}
            >
              {t.videoDesc}
            </p>

            <div className="mt-6 rounded-2xl bg-[#FF7A59] py-4 text-center font-bold text-white">
              {t.videoBtn}
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}