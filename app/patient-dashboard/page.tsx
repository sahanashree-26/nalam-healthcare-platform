"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Download,
  FileText,
  Stethoscope,
  Video,
} from "lucide-react";

import PatientNavbar from "../components/PatientNavbar";
import { useApp } from "../context/AppContext";

export default function PatientDashboard() {
  const [prescription, setPrescription] = useState<any>(null);
  const { lang, isDark } = useApp();

  useEffect(() => {
    const saved = localStorage.getItem("nalamPrescription");
    if (saved) setPrescription(JSON.parse(saved));
  }, []);

  const t =
    lang === "en"
      ? {
          label: "Patient Dashboard",
          title: "Appointment History",
          desc: "View your past and upcoming consultations, payment status, AI notes and prescriptions.",
          type: "Consultation Type",
          doctor: "Doctor",
          hospital: "Hospital",
          dateTime: "Date & Time",
          payment: "Payment",
          status: "Status",
          notes: "Notes",
          prescription: "Prescription",
          download: "Download Prescription",
          noPrescription: "Prescription not received yet",
          completed: "Completed",
          upcoming: "Upcoming",
          paid: "Paid",
          aiSent: "AI notes sent to doctor",
          videoBooked: "Video call appointment booked",
          joinVideo: "Join Video Call",
        }
      : {
          label: "நோயாளர் டாஷ்போர்டு",
          title: "அப்பாயின்மெண்ட் வரலாறு",
          desc: "உங்கள் கடந்த மற்றும் வரவிருக்கும் ஆலோசனைகள், கட்டணம், AI குறிப்புகள் மற்றும் மருந்துச்சீட்டுகளை பார்க்கலாம்.",
          type: "ஆலோசனை வகை",
          doctor: "மருத்துவர்",
          hospital: "மருத்துவமனை",
          dateTime: "தேதி & நேரம்",
          payment: "கட்டணம்",
          status: "நிலை",
          notes: "குறிப்புகள்",
          prescription: "மருந்துச்சீட்டு",
          download: "மருந்துச்சீட்டை பதிவிறக்கு",
          noPrescription: "மருந்துச்சீட்டு இன்னும் வரவில்லை",
          completed: "முடிந்தது",
          upcoming: "வரவுள்ளது",
          paid: "செலுத்தப்பட்டது",
          aiSent: "AI குறிப்புகள் மருத்துவருக்கு அனுப்பப்பட்டது",
          videoBooked: "வீடியோ அழைப்பு பதிவு செய்யப்பட்டது",
          joinVideo: "வீடியோ அழைப்பில் சேர",
        };

  const appointments =
    lang === "en"
      ? [
          {
            type: "AI Consultation",
            doctor: "Dr. Priya Raman",
            hospital: "Nalam Rural Care Center",
            dateTime: "Today, 6:00 PM",
            payment: "Paid ₹300",
            status: "Completed",
            notes: "AI notes sent to doctor",
            hasPrescription: true,
            isVideo: false,
          },
          {
            type: "Video Consultation",
            doctor: "Dr. Priya Raman",
            hospital: "Nalam Rural Care Center",
            dateTime: "Today, 6:30 PM",
            payment: "Paid ₹300",
            status: "Upcoming",
            notes: "Video call appointment booked",
            hasPrescription: false,
            isVideo: true,
          },
          {
            type: "General Checkup",
            doctor: "Dr. Meena Ravi",
            hospital: "Green Valley Multi-Speciality Hospital",
            dateTime: "18 June 2026, 7:30 PM",
            payment: "Paid ₹450",
            status: "Completed",
            notes: "Prescription received",
            hasPrescription: true,
            isVideo: false,
          },
        ]
      : [
          {
            type: "AI ஆலோசனை",
            doctor: "டாக்டர் பிரியா ராமன்",
            hospital: "நலம் கிராமப்புற பராமரிப்பு மையம்",
            dateTime: "இன்று, மாலை 6:00",
            payment: "₹300 செலுத்தப்பட்டது",
            status: "முடிந்தது",
            notes: "AI குறிப்புகள் மருத்துவருக்கு அனுப்பப்பட்டது",
            hasPrescription: true,
            isVideo: false,
          },
          {
            type: "வீடியோ ஆலோசனை",
            doctor: "டாக்டர் பிரியா ராமன்",
            hospital: "நலம் கிராமப்புற பராமரிப்பு மையம்",
            dateTime: "இன்று, மாலை 6:30",
            payment: "₹300 செலுத்தப்பட்டது",
            status: "வரவுள்ளது",
            notes: "வீடியோ அழைப்பு பதிவு செய்யப்பட்டது",
            hasPrescription: false,
            isVideo: true,
          },
          {
            type: "பொது பரிசோதனை",
            doctor: "டாக்டர் மீனா ரவி",
            hospital: "கிரீன் வேலி பல்நோக்கு மருத்துவமனை",
            dateTime: "18 ஜூன் 2026, மாலை 7:30",
            payment: "₹450 செலுத்தப்பட்டது",
            status: "முடிந்தது",
            notes: "மருந்துச்சீட்டு பெறப்பட்டது",
            hasPrescription: true,
            isVideo: false,
          },
        ];

  function downloadPrescription() {
    const data = prescription || {
      doctorName: lang === "en" ? "Dr. Priya Raman" : "டாக்டர் பிரியா ராமன்",
      diagnosis: lang === "en" ? "Viral Fever" : "வைரஸ் காய்ச்சல்",
      medicine:
        lang === "en"
          ? "Paracetamol 650mg - twice daily for 3 days"
          : "பாராசிட்டமால் 650mg - 3 நாட்கள் தினமும் 2 முறை",
      advice:
        lang === "en"
          ? "Drink water, take rest, consult again if fever continues."
          : "தண்ணீர் அதிகம் குடிக்கவும், ஓய்வு எடுக்கவும்.",
      reviewDate: lang === "en" ? "25 June 2026" : "25 ஜூன் 2026",
    };

    const content = `
NALAM DIGITAL PRESCRIPTION

Patient: Sahana Shree
Doctor: ${data.doctorName}
Diagnosis: ${data.diagnosis}

Medicines:
${data.medicine}

Advice:
${data.advice}

Review Date:
${data.reviewDate || "Not mentioned"}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "nalam-prescription.txt";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-[#071A1C] text-white" : "bg-[#F7FAFA] text-[#0F172A]"
      }`}
    >
      <PatientNavbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white md:p-12">
          <p className="font-semibold text-[#FF7A59]">{t.label}</p>

          <h1 className="mt-3 text-4xl font-extrabold">
            {t.title}
          </h1>

          <p className="mt-4 max-w-3xl text-white/70">
            {t.desc}
          </p>
        </section>

        <section className="mt-10 space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className={`rounded-[2rem] border p-6 shadow-lg ${
                isDark
                  ? "border-white/10 bg-white/10"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E3F1F1] text-[#0F8B8D]">
                    {item.isVideo ? <Video size={28} /> : <Stethoscope size={28} />}
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-[#0F8B8D]">
                      {item.type}
                    </h2>

                    <p className={`mt-2 font-semibold ${isDark ? "text-white" : "text-[#0F172A]"}`}>
                      {item.doctor}
                    </p>

                    <p className={isDark ? "mt-1 text-white/70" : "mt-1 text-slate-600"}>
                      {item.hospital}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    item.status === "Completed" || item.status === "முடிந்தது"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div
                className={`mt-6 grid gap-4 rounded-3xl p-5 md:grid-cols-4 ${
                  isDark ? "bg-[#071A1C]" : "bg-[#F7FAFA]"
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-[#0F8B8D]">
                    {t.dateTime}
                  </p>
                  <p className="mt-1 font-semibold">{item.dateTime}</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#0F8B8D]">
                    {t.payment}
                  </p>
                  <p className="mt-1 font-semibold">{item.payment}</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#0F8B8D]">
                    {t.notes}
                  </p>
                  <p className={isDark ? "mt-1 text-white/70" : "mt-1 text-slate-600"}>
                    {item.notes}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#0F8B8D]">
                    {t.prescription}
                  </p>

                  {item.hasPrescription ? (
                    <button
                      onClick={downloadPrescription}
                      className="mt-2 flex items-center gap-2 rounded-xl bg-[#0F8B8D] px-4 py-2 text-sm font-bold text-white"
                    >
                      <Download size={16} />
                      {t.download}
                    </button>
                  ) : item.isVideo ? (
                    <Link
                      href="/video-consultation"
                      className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#FF7A59] px-4 py-2 text-sm font-bold text-white"
                    >
                      <CalendarCheck size={16} />
                      {t.joinVideo}
                    </Link>
                  ) : (
                    <p className="mt-1 text-sm text-yellow-600">
                      {t.noPrescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}