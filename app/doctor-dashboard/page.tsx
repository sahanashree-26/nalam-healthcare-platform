"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle,
  Clock,
  FileText,
  HeartPulse,
  History,
  LogOut,
  Mic,
  PhoneOff,
  Send,
  Star,
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

  const [videoCallStarted, setVideoCallStarted] = useState(false);
  const [videoCallEnded, setVideoCallEnded] = useState(false);
  const [showVideoPrescription, setShowVideoPrescription] = useState(false);

  const [videoDiagnosis, setVideoDiagnosis] = useState("");
  const [videoMedicine, setVideoMedicine] = useState("");
  const [videoAdvice, setVideoAdvice] = useState("");
  const [videoReviewDate, setVideoReviewDate] = useState("");
  const [videoPrescriptionSent, setVideoPrescriptionSent] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("nalamAiNotes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  function sendAiPrescription() {
    const prescription = {
      patientName: notes?.patientName || "Sahana Shree",
      doctorName: "Dr. Priya Raman",
      consultationType: "AI Consultation",
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

  function endVideoCall() {
    setVideoCallEnded(true);
    setShowVideoPrescription(true);
  }

  function sendVideoPrescription() {
    const prescription = {
      patientName: "Raj Kumar",
      doctorName: "Dr. Priya Raman",
      consultationType: "Video Consultation",
      diagnosis: videoDiagnosis,
      medicine: videoMedicine,
      advice: videoAdvice,
      reviewDate: videoReviewDate,
      date: new Date().toLocaleDateString(),
      delivery: "Sent in-app after video consultation.",
    };

    localStorage.setItem("nalamPrescription", JSON.stringify(prescription));
    setVideoPrescriptionSent(true);
  }

  return (
    <main className="min-h-screen bg-[#F7FAFA] px-6 py-8 text-[#0F172A]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
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

        {/* Hero */}
        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white md:p-12">
          <p className="font-semibold text-[#FF7A59]">Doctor Dashboard</p>
          <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Manage AI notes, video calls, prescriptions and history.
          </h2>
          <p className="mt-5 max-w-2xl text-white/70">
            Review patient AI notes, attend video consultations, send digital
            prescriptions, and track completed consultations.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <CalendarCheck className="text-[#0F8B8D]" />
            <p className="mt-3 text-sm text-slate-500">Today Appointments</p>
            <h2 className="text-3xl font-bold">08</h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <HeartPulse className="text-red-500" />
            <p className="mt-3 text-sm text-slate-500">AI Notes Received</p>
            <h2 className="text-3xl font-bold">{notes ? "01" : "00"}</h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <Video className="text-[#FF7A59]" />
            <p className="mt-3 text-sm text-slate-500">Video Consultations</p>
            <h2 className="text-3xl font-bold">03</h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <FileText className="text-blue-600" />
            <p className="mt-3 text-sm text-slate-500">Prescriptions Sent</p>
            <h2 className="text-3xl font-bold">120</h2>
          </div>
        </section>

        {/* Today's Appointments */}
        <section className="mt-10 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
          <div className="mb-6 flex items-center gap-3">
            <CalendarCheck className="text-[#0F8B8D]" />
            <h2 className="text-2xl font-bold">Today&apos;s Appointments</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["6:00 PM", notes?.patientName || "Sahana Shree", "AI Consultation"],
              ["7:00 PM", "Raj Kumar", "Video Consultation"],
              ["7:30 PM", "Meena S", "Video Consultation"],
            ].map(([time, patient, type]) => (
              <div key={patient} className="rounded-3xl bg-[#F7FAFA] p-5">
                <p className="font-bold text-[#0F8B8D]">{time}</p>
                <h3 className="mt-2 text-xl font-bold">{patient}</h3>
                <p className="mt-1 text-slate-600">{type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Notes + Prescription */}
        <section className="mt-10 grid gap-8 md:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
            <div className="mb-6 flex items-center gap-3">
              <FileText className="text-[#0F8B8D]" />
              <h2 className="text-2xl font-bold">AI Notes Received</h2>
            </div>

            {notes ? (
              <div className="rounded-3xl bg-[#E3F1F1] p-6 text-slate-700">
                <p>
                  <b>Patient:</b> {notes.patientName}
                </p>
                <p className="mt-3">
                  <b>Symptoms:</b> {notes.summary.chiefComplaint}
                </p>
                <p className="mt-3">
                  <b>Duration:</b> {notes.summary.duration}
                </p>
                <p className="mt-3">
                  <b>Associated Symptoms:</b>{" "}
                  {notes.summary.associatedSymptoms}
                </p>
                <p className="mt-3">
                  <b>Medicine History:</b> {notes.summary.medicineHistory}
                </p>
              </div>
            ) : (
              <div className="rounded-3xl bg-yellow-100 p-6 text-yellow-800">
                No AI notes received yet.
              </div>
            )}
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
            <div className="mb-6 flex items-center gap-3">
              <Stethoscope className="text-[#FF7A59]" />
              <h2 className="text-2xl font-bold">Write Prescription</h2>
            </div>

            <div className="space-y-4">
              <input
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Diagnosis"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none"
              />

              <textarea
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                placeholder="Medicines and dosage"
                className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none"
              />

              <textarea
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                placeholder="Advice"
                className="min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none"
              />

              <input
                value={reviewDate}
                onChange={(e) => setReviewDate(e.target.value)}
                placeholder="Next Review Date"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none"
              />

              <button
                onClick={sendAiPrescription}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF7A59] py-4 font-bold text-white"
              >
                <Send size={18} />
                Send Prescription
              </button>

              {sent && (
                <div className="rounded-3xl bg-green-100 p-5 text-green-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle />
                    <p className="font-bold">Prescription sent successfully.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Video Consultation Schedule */}
        <section className="mt-10 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
          <div className="mb-6 flex items-center gap-3">
            <Video className="text-[#FF7A59]" />
            <h2 className="text-2xl font-bold">Video Consultation Schedule</h2>
          </div>

          {!videoCallStarted && (
            <div className="grid gap-5 md:grid-cols-2">
              {[
                ["Raj Kumar", "7:00 PM", "Fever and cough"],
                ["Meena S", "7:30 PM", "Child health consultation"],
              ].map(([patient, time, reason]) => (
                <div key={patient} className="rounded-3xl bg-[#F7FAFA] p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E3F1F1] text-[#0F8B8D]">
                      <User />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{patient}</h3>
                      <p className="text-slate-600">{time}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-600">
                    <b>Reason:</b> {reason}
                  </p>

                  <button
                    onClick={() => {
                      setVideoCallStarted(true);
                      setVideoCallEnded(false);
                      setShowVideoPrescription(false);
                      setVideoPrescriptionSent(false);
                    }}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F8B8D] py-3 font-bold text-white"
                  >
                    <Video size={18} />
                    Start Call
                  </button>
                </div>
              ))}
            </div>
          )}

          {videoCallStarted && !videoCallEnded && (
            <div className="rounded-[2rem] bg-[#0A2426] p-6 text-white">
              <h3 className="text-2xl font-bold">Video Call In Progress</h3>
              <p className="mt-2 text-white/70">
                Patient: Raj Kumar • Time: 7:00 PM
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="flex min-h-52 flex-col items-center justify-center rounded-3xl bg-white/10">
                  <Video className="text-[#FF7A59]" size={48} />
                  <p className="mt-3 font-bold">Doctor Camera ON</p>
                </div>

                <div className="flex min-h-52 flex-col items-center justify-center rounded-3xl bg-white/10">
                  <User className="text-[#0F8B8D]" size={48} />
                  <p className="mt-3 font-bold">Patient Camera ON</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <button className="rounded-full bg-[#0F8B8D] px-6 py-3 font-bold">
                  <Mic size={18} className="mr-2 inline" />
                  Mic ON
                </button>

                <button
                  onClick={endVideoCall}
                  className="rounded-full bg-red-500 px-6 py-3 font-bold"
                >
                  <PhoneOff size={18} className="mr-2 inline" />
                  End Call
                </button>
              </div>
            </div>
          )}

          {showVideoPrescription && (
            <div className="mt-8 rounded-[2rem] bg-[#F7FAFA] p-6">
              <div className="mb-6 flex items-center gap-3">
                <Stethoscope className="text-[#FF7A59]" />
                <h2 className="text-2xl font-bold">
                  Send Prescription After Video Call
                </h2>
              </div>

              <div className="space-y-4">
                <input
                  value={videoDiagnosis}
                  onChange={(e) => setVideoDiagnosis(e.target.value)}
                  placeholder="Diagnosis"
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none"
                />

                <textarea
                  value={videoMedicine}
                  onChange={(e) => setVideoMedicine(e.target.value)}
                  placeholder="Medicines and dosage"
                  className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none"
                />

                <textarea
                  value={videoAdvice}
                  onChange={(e) => setVideoAdvice(e.target.value)}
                  placeholder="Advice"
                  className="min-h-24 w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none"
                />

                <input
                  value={videoReviewDate}
                  onChange={(e) => setVideoReviewDate(e.target.value)}
                  placeholder="Next Review Date"
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none"
                />

                <button
                  onClick={sendVideoPrescription}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF7A59] py-4 font-bold text-white"
                >
                  <Send size={18} />
                  Send Prescription
                </button>

                {videoPrescriptionSent && (
                  <div className="rounded-3xl bg-green-100 p-5 text-green-700">
                    <div className="flex items-center gap-3">
                      <CheckCircle />
                      <p className="font-bold">
                        Video consultation prescription sent successfully.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Consultation History */}
        <section className="mt-10 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
          <div className="mb-6 flex items-center gap-3">
            <History className="text-[#0F8B8D]" />
            <h2 className="text-2xl font-bold">Consultation History</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <div className="rounded-3xl bg-[#E3F1F1] p-5">
              <p className="text-sm text-slate-600">Total Patients Seen</p>
              <h3 className="mt-2 text-3xl font-bold text-[#0F8B8D]">124</h3>
            </div>

            <div className="rounded-3xl bg-[#E3F1F1] p-5">
              <p className="text-sm text-slate-600">AI Consultations</p>
              <h3 className="mt-2 text-3xl font-bold text-[#0F8B8D]">78</h3>
            </div>

            <div className="rounded-3xl bg-[#E3F1F1] p-5">
              <p className="text-sm text-slate-600">Video Consultations</p>
              <h3 className="mt-2 text-3xl font-bold text-[#0F8B8D]">46</h3>
            </div>

            <div className="rounded-3xl bg-[#E3F1F1] p-5">
              <p className="text-sm text-slate-600">Prescriptions Sent</p>
              <h3 className="mt-2 text-3xl font-bold text-[#0F8B8D]">120</h3>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-4 bg-[#0A2426] p-4 font-bold text-white">
              <p>Date</p>
              <p>Patient</p>
              <p>Type</p>
              <p>Status</p>
            </div>

            {[
              ["20 Jun 2026", "Sahana Shree", "AI Consultation", "Completed"],
              ["20 Jun 2026", "Raj Kumar", "Video Consultation", "Completed"],
              ["19 Jun 2026", "Meena S", "Video Consultation", "Completed"],
              ["18 Jun 2026", "Kumar", "AI Consultation", "Completed"],
            ].map(([date, patient, type, status]) => (
              <div
                key={`${date}-${patient}`}
                className="grid grid-cols-4 border-t border-slate-200 bg-white p-4 text-sm"
              >
                <p>{date}</p>
                <p>{patient}</p>
                <p>{type}</p>
                <p className="font-bold text-green-600">{status}</p>
              </div>
            ))}
          </div>

          <button className="mt-6 rounded-2xl bg-[#0F8B8D] px-6 py-3 font-bold text-white">
            View Full History
          </button>
        </section>
      </div>
    </main>
  );
}