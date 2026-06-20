"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Building2,
  FileText,
  Globe2,
  Hospital,
  Languages,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import PatientNavbar from "../components/PatientNavbar";
import { useApp } from "../context/AppContext";

export default function FeaturesPage() {
  const { lang, isDark } = useApp();

  const features =
    lang === "en"
      ? [
          {
            icon: Brain,
            title: "AI Voice Consultation",
            desc: "Patients can speak symptoms in Tamil or English and receive AI-prepared doctor notes.",
          },
          {
            icon: Languages,
            title: "Tamil & English Support",
            desc: "Designed for rural Tamil Nadu users with multilingual healthcare access.",
          },
          {
            icon: Hospital,
            title: "Nearby Hospital Search",
            desc: "Patients can search hospitals and view available doctors.",
          },
          {
            icon: Stethoscope,
            title: "Doctor Search",
            desc: "Find doctors by name, specialty, hospital, or city.",
          },
          {
            icon: FileText,
            title: "Digital Prescription",
            desc: "Doctors can send prescriptions directly to the patient dashboard.",
          },
          {
            icon: ShieldCheck,
            title: "Secure Health Records",
            desc: "Prescriptions and consultation notes are stored securely.",
          },
          {
            icon: Building2,
            title: "Hospital Admin Dashboard",
            desc: "Manage doctors, patients, appointments and reports.",
          },
          {
            icon: Globe2,
            title: "Accessible Healthcare Platform",
            desc: "Connecting patients, doctors and hospitals digitally.",
          },
        ]
      : [
          {
            icon: Brain,
            title: "AI குரல் ஆலோசனை",
            desc: "நோயாளிகள் தமிழ் அல்லது ஆங்கிலத்தில் அறிகுறிகளை கூறலாம்.",
          },
          {
            icon: Languages,
            title: "தமிழ் & ஆங்கில ஆதரவு",
            desc: "கிராமப்புற தமிழ்நாட்டிற்கான பலமொழி சுகாதார சேவை.",
          },
          {
            icon: Hospital,
            title: "அருகிலுள்ள மருத்துவமனை தேடல்",
            desc: "மருத்துவமனைகள் மற்றும் மருத்துவர்களை கண்டறியலாம்.",
          },
          {
            icon: Stethoscope,
            title: "மருத்துவர் தேடல்",
            desc: "பெயர், சிறப்பு, மருத்துவமனை மூலம் தேடலாம்.",
          },
          {
            icon: FileText,
            title: "டிஜிட்டல் மருந்துச்சீட்டு",
            desc: "மருத்துவர்கள் நேரடியாக மருந்துச்சீட்டை அனுப்பலாம்.",
          },
          {
            icon: ShieldCheck,
            title: "பாதுகாப்பான மருத்துவ பதிவுகள்",
            desc: "அனைத்து மருத்துவ குறிப்புகளும் பாதுகாப்பாக சேமிக்கப்படும்.",
          },
          {
            icon: Building2,
            title: "மருத்துவமனை நிர்வாகம்",
            desc: "மருத்துவர்கள், நோயாளிகள் மற்றும் அறிக்கைகளை நிர்வகிக்கலாம்.",
          },
          {
            icon: Globe2,
            title: "அணுகக்கூடிய சுகாதார தளம்",
            desc: "நோயாளிகள், மருத்துவர்கள் மற்றும் மருத்துவமனைகளை இணைக்கிறது.",
          },
        ];

  return (
    <main
      className={`min-h-screen ${
        isDark
          ? "bg-[#071A1C] text-white"
          : "bg-[#F7FAFA] text-[#0F172A]"
      }`}
    >
      <PatientNavbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link
          href="/patient-home"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#0F8B8D] shadow-md"
        >
          <ArrowLeft size={18} />
          {lang === "en" ? "Back to Home" : "முகப்பிற்கு திரும்பு"}
        </Link>

        <section className="rounded-[2rem] bg-[#0A2426] p-10 text-white">
          <p className="font-bold text-[#FF7A59]">
            {lang === "en"
              ? "Features & Services"
              : "சிறப்பம்சங்கள் மற்றும் சேவைகள்"}
          </p>

          <h1 className="mt-3 text-5xl font-black">
            {lang === "en"
              ? "Smart healthcare services for rural communities."
              : "கிராமப்புற மக்களுக்கான புத்திசாலி சுகாதார சேவைகள்."}
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-white/75">
            {lang === "en"
              ? "Nalam brings patients, doctors and hospitals together through AI-powered healthcare."
              : "AI உதவியுடன் நோயாளிகள், மருத்துவர்கள் மற்றும் மருத்துவமனைகளை நலம் இணைக்கிறது."}
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`rounded-3xl border p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ${
                  isDark
                    ? "border-white/10 bg-white/10"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E3F1F1] text-[#0F8B8D]">
                  <Icon size={28} />
                </div>

                <h2
                  className={`mt-5 text-xl font-black ${
                    isDark ? "text-white" : "text-[#0A2426]"
                  }`}
                >
                  {item.title}
                </h2>

                <p
                  className={`mt-3 leading-7 ${
                    isDark ? "text-white/75" : "text-slate-700"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}