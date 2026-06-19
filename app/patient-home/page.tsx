"use client";

import Image from "next/image";
import Link from "next/link";
import { Mic } from "lucide-react";

export default function PatientHome() {
  function logout() {
    localStorage.removeItem("nalamLoggedIn");
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-[#F7FAFA] text-[#0F172A]">
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl">
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
              <p className="text-xs font-medium text-slate-600">
                Wellness Within Reach
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-bold text-slate-700 md:flex">
            <Link href="/patient-home">Home</Link>
            <Link href="/hospitals">Hospitals</Link>
            <Link href="/doctors">Doctors</Link>
            <Link href="/patient-dashboard">Dashboard</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <button
            onClick={logout}
            className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-md"
          >
            Logout
          </button>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute right-[-120px] top-[-120px] h-96 w-96 rounded-full bg-[#0F8B8D]/10" />
        <div className="absolute left-[-100px] bottom-[-100px] h-80 w-80 rounded-full bg-[#FF7A59]/10" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-[#E3F1F1] px-4 py-2 text-sm font-bold text-[#0F8B8D]">
              AI-powered rural healthcare platform
            </div>

            <h2 className="text-5xl font-black leading-tight text-[#0A2426] md:text-6xl">
              Healthcare in your{" "}
              <span className="text-[#0F8B8D]">own language</span>, from
              anywhere.
            </h2>

            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-slate-700">
              Nalam helps patients find nearby hospitals, connect with trusted
              doctors, speak symptoms in Tamil or English, and receive digital
              prescriptions.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/hospitals"
                className="rounded-full bg-[#0F8B8D] px-8 py-4 font-bold text-white shadow-lg"
              >
                Explore Hospitals
              </Link>

              <Link
                href="/doctors"
                className="rounded-full border-2 border-[#0F8B8D] px-8 py-4 font-bold text-[#0F8B8D]"
              >
                Find Doctors
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#0A2426] p-6 text-white shadow-2xl">
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white/70">
                    AI Doctor Notes
                  </p>
                  <h3 className="text-2xl font-bold">Voice Summary</h3>
                </div>
                <Mic className="text-[#FF7A59]" />
              </div>

              <div className="rounded-2xl bg-white p-4 text-[#0F172A]">
                <p className="text-sm font-bold text-[#0F8B8D]">
                  Patient Voice
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700">
                  “எனக்கு மூன்று நாளாக காய்ச்சல், தலைவலி இருக்கு...”
                </p>
              </div>

              <div className="my-5 flex justify-center">
                <div className="rounded-full bg-[#FF7A59]/20 px-4 py-2 text-sm font-bold text-[#FFB199]">
                  AI converting...
                </div>
              </div>

              <div className="rounded-2xl bg-[#E3F1F1] p-4 text-[#0F172A]">
                <p className="text-sm font-bold">Doctor Notes</p>
                <ul className="mt-3 space-y-2 text-sm font-medium text-slate-800">
                  <li>• Fever for 3 days</li>
                  <li>• Headache and body pain</li>
                  <li>• Language: Tamil</li>
                  <li>• Suggested consult: General Physician</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}