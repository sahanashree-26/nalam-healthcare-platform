"use client";

import Link from "next/link";
import { ArrowLeft, Mic } from "lucide-react";

export default function VoiceConsultPage() {
  return (
    <main className="min-h-screen bg-[#F7FAFA] px-6 py-10 text-[#0F172A]">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/patient-home"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#0F8B8D] shadow-md"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <section className="rounded-[2rem] bg-[#0A2426] p-10 text-white">
          <p className="font-semibold text-[#FF7A59]">AI Voice Consultation</p>
          <h1 className="mt-3 text-4xl font-extrabold">
            Speak your symptoms in Tamil or English.
          </h1>
          <p className="mt-4 text-white/70">
            This demo page represents the AI voice consultation flow.
          </p>
        </section>

        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-xl">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E3F1F1] text-[#0F8B8D]">
            <Mic size={42} />
          </div>

          <h2 className="mt-6 text-center text-3xl font-black">
            Voice Assistant Ready
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-center font-medium text-slate-700">
            Patient can speak symptoms, and the system will prepare AI notes
            for the doctor.
          </p>

          <div className="mt-8 rounded-3xl bg-[#E3F1F1] p-6">
            <p className="font-bold text-[#0A2426]">Sample AI Notes</p>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>• Fever for 3 days</li>
              <li>• Headache and body pain</li>
              <li>• Language: Tamil</li>
              <li>• Suggested doctor: General Physician</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}