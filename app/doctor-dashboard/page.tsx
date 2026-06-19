"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle,
  Clock,
  FileText,
  HeartPulse,
  Hospital,
  LogOut,
  Send,
  Stethoscope,
  User,
  Video,
} from "lucide-react";

type AiNotes = {
  patientName: string;
  language: string;
  doctor: string;
  specialty: string;
  appointmentTime: string;
  summary: {
    chiefComplaint: string;
    duration: string;
    associatedSymptoms: string;
    medicineHistory: string;
    medicalHistory?: string;
  };
};

export default function DoctorDashboard() {
  const [notes, setNotes] = useState<AiNotes | null>(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [medicine, setMedicine] = useState("");
  const [advice, setAdvice] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("nalamAiNotes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  function sendPrescription() {
    const prescription = {
      patientName: notes?.patientName || "Sahana Shree",
      doctorName: "Dr. Priya Raman",
      diagnosis,
      medicine,
      advice,
      reviewDate,
      date: new Date().toLocaleDateString(),
      delivery: "Sent in-app.",
    };

    localStorage.setItem("nalamPrescription", JSON.stringify(prescription));
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-[#F7FAFA] px-6 py-8 text-[#0F172A]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#0A2426]">
              Doctor Portal
            </h1>
            <p className="mt-1 font-medium text-slate-600">
              Nalam Rural Care Center
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 font-bold text-white shadow-md"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white md:p-12">
          <p className="font-semibold text-[#FF7A59]">Doctor Dashboard</p>
          <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Review AI notes and send digital prescriptions.
          </h2>
          <p className="mt-5 max-w-2xl text-white/70">
            View assigned patients, check AI summaries, start consultation, and
            send prescriptions securely.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <CalendarCheck className="text-[#0F8B8D]" />
            <p className="mt-3 text-sm text-slate-500">Today Appointments</p>
            <h2 className="text-3xl font-bold">08</h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <Clock className="text-[#FF7A59]" />
            <p className="mt-3 text-sm text-slate-500">Waiting Patients</p>
            <h2 className="text-3xl font-bold">03</h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <HeartPulse className="text-red-500" />
            <p className="mt-3 text-sm text-slate-500">AI Notes Received</p>
            <h2 className="text-3xl font-bold">{notes ? "01" : "00"}</h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <Hospital className="text-[#0F8B8D]" />
            <p className="mt-3 text-sm text-slate-500">Hospital</p>
            <h2 className="text-lg font-bold">Nalam Rural Care</h2>
          </div>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-[0.9fr_1.4fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
            <h2 className="mb-5 text-2xl font-bold">Assigned Patients</h2>

            <div className="w-full rounded-3xl bg-[#0A2426] p-5 text-left text-white ring-1 ring-[#0F8B8D]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E3F1F1] text-[#0F8B8D]">
                  <User />
                </div>
                <div>
                  <h3 className="font-bold">
                    {notes?.patientName || "Sahana Shree"}
                  </h3>
                  <p className="text-sm opacity-70">Today, 6:00 PM</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700">
                  AI Notes Ready
                </span>
                <span className="rounded-full bg-yellow-100 px-3 py-1 font-semibold text-yellow-700">
                  Normal Priority
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-3xl bg-[#F7FAFA] p-5">
              <p className="text-sm font-semibold text-slate-500">
                Upcoming Patients
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>• Patient Raj - 7:00 PM</p>
                <p>• Patient Meena - 7:30 PM</p>
                <p>• Patient Kumar - 8:00 PM</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
              <div className="mb-6 flex items-center gap-3">
                <FileText className="text-[#0F8B8D]" />
                <h2 className="text-2xl font-bold">AI Notes from Patient</h2>
              </div>

              {notes ? (
                <div className="rounded-3xl bg-[#E3F1F1] p-6 text-slate-700">
                  <div className="mb-5 grid gap-4 md:grid-cols-2">
                    <p>
                      <b>Patient:</b> {notes.patientName}
                    </p>
                    <p>
                      <b>Language:</b> {notes.language}
                    </p>
                    <p>
                      <b>Doctor:</b> {notes.doctor}
                    </p>
                    <p>
                      <b>Time:</b> {notes.appointmentTime}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p>
                      <b>Chief Complaint:</b> {notes.summary.chiefComplaint}
                    </p>
                    <p>
                      <b>Duration:</b> {notes.summary.duration}
                    </p>
                    <p>
                      <b>Associated Symptoms:</b>{" "}
                      {notes.summary.associatedSymptoms}
                    </p>
                    <p>
                      <b>Medicine History:</b> {notes.summary.medicineHistory}
                    </p>
                    <p>
                      <b>Medical History:</b>{" "}
                      {notes.summary.medicalHistory || "Not provided"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl bg-yellow-100 p-6 text-yellow-800">
                  No AI notes received yet. Complete AI consultation first.
                </div>
              )}

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F8B8D] py-4 font-bold text-white">
                <Video size={18} />
                Start Online Consultation
              </button>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
              <div className="mb-6 flex items-center gap-3">
                <Stethoscope className="text-[#FF7A59]" />
                <h2 className="text-2xl font-bold">
                  Send Digital Prescription
                </h2>
              </div>

              <div className="space-y-4">
                <input
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Diagnosis: Example Viral Fever"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#0F8B8D]"
                />

                <textarea
                  value={medicine}
                  onChange={(e) => setMedicine(e.target.value)}
                  placeholder="Medicines and dosage: Example Paracetamol 650mg - twice daily for 3 days"
                  className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#0F8B8D]"
                />

                <textarea
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                  placeholder="Advice: Example Drink water, take rest, consult again if fever continues"
                  className="min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#0F8B8D]"
                />

                <input
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                  placeholder="Next Review Date: Example 25 June 2026"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#0F8B8D]"
                />

                <button
                  onClick={sendPrescription}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF7A59] py-4 font-bold text-white"
                >
                  <Send size={18} />
                  Send Prescription to Patient
                </button>

                {sent && (
                  <div className="rounded-3xl bg-green-100 p-5 text-green-700">
                    <div className="flex items-center gap-3">
                      <CheckCircle />
                      <p className="font-bold">
                        Prescription sent successfully.
                      </p>
                    </div>
                    <p className="mt-2 text-sm">
                      Prescription has been sent to the patient in-app.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}