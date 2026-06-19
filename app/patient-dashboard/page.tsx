"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  FileText,
  HeartPulse,
  Hospital,
  Stethoscope,
} from "lucide-react";

export default function PatientDashboard() {
  const [prescription, setPrescription] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nalamPrescription");
    if (saved) setPrescription(JSON.parse(saved));
  }, []);

  return (
    <main className="min-h-screen bg-[#F7FAFA] px-6 py-8 text-[#0F172A]">
      <div className="mx-auto max-w-7xl">
        <Link href="/patient-home" className="mb-8 inline-flex items-center gap-2 font-semibold text-[#0F8B8D]">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white md:p-12">
          <p className="font-semibold text-[#FF7A59]">Patient Dashboard</p>
          <h1 className="mt-3 text-4xl font-extrabold">Welcome, Sahana Shree</h1>
          <p className="mt-4 text-white/70">
            Track appointments, AI notes, prescriptions, and health records.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <CalendarCheck className="mb-4 text-[#0F8B8D]" />
            <h2 className="text-xl font-bold">Upcoming Appointment</h2>
            <p className="mt-3 text-slate-600">Today, 6:00 PM</p>
            <p className="text-slate-600">Dr. Priya Raman</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <Hospital className="mb-4 text-[#0F8B8D]" />
            <h2 className="text-xl font-bold">Hospital</h2>
            <p className="mt-3 text-slate-600">Nalam Rural Care Center</p>
            <p className="text-slate-600">Salem, Tamil Nadu</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <HeartPulse className="mb-4 text-[#FF7A59]" />
            <h2 className="text-xl font-bold">AI Notes Status</h2>
            <p className="mt-3 font-semibold text-green-700">
              Sent to Doctor
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-100">
          <div className="mb-5 flex items-center gap-3">
            <FileText className="text-[#0F8B8D]" />
            <h2 className="text-2xl font-bold">Latest Prescription</h2>
          </div>

          {prescription ? (
            <div className="rounded-3xl bg-[#E3F1F1] p-6">
              <p><b>Doctor:</b> {prescription.doctorName}</p>
              <p className="mt-2"><b>Diagnosis:</b> {prescription.diagnosis}</p>
              <p className="mt-2"><b>Medicines:</b></p>
              <pre className="mt-2 whitespace-pre-wrap rounded-2xl bg-white p-4">
                {prescription.medicine}
              </pre>
              <p className="mt-2"><b>Advice:</b></p>
              <pre className="mt-2 whitespace-pre-wrap rounded-2xl bg-white p-4">
                {prescription.advice}
              </pre>
              <Link
                href="/prescription"
                className="mt-5 block rounded-2xl bg-[#0F8B8D] py-3 text-center font-bold text-white"
              >
                View Full Prescription
              </Link>
            </div>
          ) : (
            <div className="rounded-3xl bg-yellow-100 p-6 text-yellow-800">
              No prescription received yet.
            </div>
          )}
        </section>

        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <div className="mb-5 flex items-center gap-3">
            <Stethoscope className="text-[#FF7A59]" />
            <h2 className="text-2xl font-bold">Quick Actions</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/hospitals" className="rounded-2xl bg-[#0F8B8D] py-4 text-center font-bold text-white">
              Find Hospitals
            </Link>
            <Link href="/appointment" className="rounded-2xl bg-[#FF7A59] py-4 text-center font-bold text-white">
              AI Consultation
            </Link>
            <Link href="/prescription" className="rounded-2xl border border-[#0F8B8D] py-4 text-center font-bold text-[#0F8B8D]">
              Prescriptions
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}