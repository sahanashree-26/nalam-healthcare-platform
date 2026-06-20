"use client";

import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
} from "lucide-react";

import PatientNavbar from "../components/PatientNavbar";
import { useApp } from "../context/AppContext";

export default function ContactPage() {
  const { lang, isDark } = useApp();

  const t =
    lang === "en"
      ? {
          title: "Contact Nalam",
          subtitle:
            "Need help with appointments, hospitals, doctors, or AI consultations? Our support team is available to assist you.",
          call: "Call Support",
          email: "Email Support",
          whatsapp: "WhatsApp Support",
          supportHours: "Support Hours",
          available: "Available Monday - Sunday",
          response: "Response within 24 hours",
          chat: "Chat on WhatsApp",
          footer: "Nalam Healthcare Support",
          footerDesc:
            "Connecting patients, hospitals, and doctors through AI-powered healthcare solutions.",
        }
      : {
          title: "நலம் தொடர்பு மையம்",
          subtitle:
            "அப்பாயின்மெண்ட், மருத்துவமனை, மருத்துவர் அல்லது AI ஆலோசனை தொடர்பான உதவி வேண்டுமா?",
          call: "தொலைபேசி உதவி",
          email: "மின்னஞ்சல் உதவி",
          whatsapp: "வாட்ஸ்அப் உதவி",
          supportHours: "சேவை நேரம்",
          available: "திங்கள் முதல் ஞாயிறு வரை",
          response: "24 மணி நேரத்திற்குள் பதில்",
          chat: "வாட்ஸ்அப்பில் உரையாடுங்கள்",
          footer: "நலம் சுகாதார ஆதரவு",
          footerDesc:
            "AI உதவியுடன் நோயாளிகள், மருத்துவர்கள் மற்றும் மருத்துவமனைகளை இணைக்கிறது.",
        };

  return (
    <main
      className={`min-h-screen ${
        isDark
          ? "bg-[#071A1C] text-white"
          : "bg-[#F7FAFA] text-[#0F172A]"
      }`}
    >
      <PatientNavbar />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <section className="rounded-[2rem] bg-[#0A2426] p-10 text-white">
          <h1 className="text-5xl font-extrabold">{t.title}</h1>

          <p className="mt-4 text-lg text-white/80">
            {t.subtitle}
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div
            className={`rounded-3xl border p-8 shadow-lg ${
              isDark
                ? "border-white/10 bg-white/10"
                : "border-slate-200 bg-white"
            }`}
          >
            <Phone className="text-[#0F8B8D]" size={40} />

            <h3 className="mt-5 text-2xl font-bold">{t.call}</h3>

            <p className="mt-3 text-lg font-medium">
              +91 1234567890
            </p>

            <p className="mt-2 text-sm opacity-70">
              {t.available}
            </p>
          </div>

          <div
            className={`rounded-3xl border p-8 shadow-lg ${
              isDark
                ? "border-white/10 bg-white/10"
                : "border-slate-200 bg-white"
            }`}
          >
            <Mail className="text-[#FF7A59]" size={40} />

            <h3 className="mt-5 text-2xl font-bold">{t.email}</h3>

            <p className="mt-3 text-lg font-medium break-all">
              ping.engineering@gmail.com
            </p>

            <p className="mt-2 text-sm opacity-70">
              {t.response}
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div
            className={`rounded-3xl border p-8 shadow-lg ${
              isDark
                ? "border-white/10 bg-white/10"
                : "border-slate-200 bg-white"
            }`}
          >
            <MessageCircle
              className="text-[#0F8B8D]"
              size={40}
            />

            <h3 className="mt-5 text-2xl font-bold">
              {t.whatsapp}
            </h3>

            <p className="mt-3 opacity-80">
              {lang === "en"
                ? "Chat with our support team for quick assistance."
                : "எங்கள் குழுவுடன் உடனடி உதவிக்காக உரையாடுங்கள்."}
            </p>

            <button className="mt-5 rounded-2xl bg-[#0F8B8D] px-6 py-3 font-bold text-white">
              {t.chat}
            </button>
          </div>

          <div
            className={`rounded-3xl border p-8 shadow-lg ${
              isDark
                ? "border-white/10 bg-white/10"
                : "border-slate-200 bg-white"
            }`}
          >
            <Clock
              className="text-[#FF7A59]"
              size={40}
            />

            <h3 className="mt-5 text-2xl font-bold">
              {t.supportHours}
            </h3>

            <p className="mt-3 opacity-80">
              {t.available}
            </p>

            <p className="font-semibold text-[#0F8B8D]">
              8:00 AM - 10:00 PM
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-3xl bg-[#E3F1F1] p-8 text-center">
          <h2 className="text-3xl font-bold text-[#0A2426]">
            {t.footer}
          </h2>

          <p className="mt-4 text-slate-700">
            {t.footerDesc}
          </p>
        </section>
      </div>
    </main>
  );
}