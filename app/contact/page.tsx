"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7FAFA] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          href="/patient-home"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#0F8B8D] shadow-md transition hover:shadow-lg"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Hero Section */}
        <section className="rounded-[2rem] bg-[#0A2426] p-10 text-white">
          <h1 className="text-5xl font-extrabold">
            Contact Nalam
          </h1>

          <p className="mt-4 text-lg text-white/80">
            Need help with appointments, hospitals, doctors, or AI consultations?
            Our support team is available to assist you.
          </p>
        </section>

        {/* Contact Cards */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <Phone className="text-[#0F8B8D]" size={40} />

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              Call Support
            </h3>

            <p className="mt-3 text-lg font-medium text-slate-700">
              +91 1234567890
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Available Monday - Sunday
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <Mail className="text-[#FF7A59]" size={40} />

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              Email Support
            </h3>

            <p className="mt-3 text-lg font-medium text-slate-700 break-all">
              ping.engineering@gmail.com
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Response within 24 hours
            </p>
          </div>

        </section>

        {/* Support Information */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <MessageCircle
              className="text-[#0F8B8D]"
              size={40}
            />

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              WhatsApp Support
            </h3>

            <p className="mt-3 text-slate-700">
              Chat with our support team for quick assistance.
            </p>

            <button className="mt-5 rounded-2xl bg-[#0F8B8D] px-6 py-3 font-bold text-white">
              Chat on WhatsApp
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <Clock
              className="text-[#FF7A59]"
              size={40}
            />

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              Support Hours
            </h3>

            <p className="mt-3 text-slate-700">
              Monday - Sunday
            </p>

            <p className="font-semibold text-[#0F8B8D]">
              8:00 AM - 10:00 PM
            </p>
          </div>

        </section>

        {/* Footer Card */}
        <section className="mt-10 rounded-3xl bg-[#E3F1F1] p-8 text-center">
          <h2 className="text-3xl font-bold text-[#0A2426]">
            Nalam Healthcare Support
          </h2>

          <p className="mt-4 text-slate-700">
            Connecting patients, hospitals, and doctors through AI-powered
            healthcare solutions.
          </p>
        </section>

      </div>
    </main>
  );
}