"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  IndianRupee,
  Landmark,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import PatientNavbar from "../components/PatientNavbar";
import { useApp } from "../context/AppContext";

export default function PaymentPage() {
  const [method, setMethod] = useState("UPI");
  const [paid, setPaid] = useState(false);
  const { lang, isDark } = useApp();

  const t =
    lang === "en"
      ? {
          back: "Back to Doctors",
          label: "Secure Payment",
          title: "Pay consultation fee to confirm appointment",
          desc: "Complete payment to proceed with your healthcare consultation.",
          summary: "Appointment Summary",
          hospital: "Hospital",
          doctor: "Doctor",
          specialty: "Specialty",
          mode: "Mode",
          time: "Time",
          online: "Online Consultation",
          total: "Total Amount",
          choose: "Choose Payment Method",
          upiPlaceholder: "Enter UPI ID: name@upi",
          cardPlaceholder: "Card Number",
          bank: "Select Bank",
          demo: "Payment is shown as demo now. Razorpay can be connected later.",
          pay: "Pay ₹300",
          success: "Payment Successful",
          chooseType: "Choose Consultation Type",
          gp: "General Physician",
          today: "Today, 6:00 PM",
        }
      : {
          back: "மருத்துவர்களுக்கு திரும்பு",
          label: "பாதுகாப்பான கட்டணம்",
          title: "அப்பாயின்மெண்ட் உறுதிப்படுத்த கட்டணம் செலுத்துங்கள்",
          desc: "சுகாதார ஆலோசனைக்கு தொடர கட்டணம் செலுத்துங்கள்.",
          summary: "அப்பாயின்மெண்ட் விவரம்",
          hospital: "மருத்துவமனை",
          doctor: "மருத்துவர்",
          specialty: "சிறப்பு",
          mode: "முறை",
          time: "நேரம்",
          online: "ஆன்லைன் ஆலோசனை",
          total: "மொத்த தொகை",
          choose: "கட்டண முறையை தேர்வு செய்க",
          upiPlaceholder: "UPI ID உள்ளிடவும்: name@upi",
          cardPlaceholder: "கார்டு எண்",
          bank: "வங்கியை தேர்வு செய்க",
          demo: "இது டெமோ கட்டணம். பின்னர் Razorpay இணைக்கலாம்.",
          pay: "₹300 செலுத்து",
          success: "கட்டணம் வெற்றிகரமாக செலுத்தப்பட்டது",
          chooseType: "ஆலோசனை வகையை தேர்வு செய்க",
          gp: "பொது மருத்துவர்",
          today: "இன்று, மாலை 6:00",
        };

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-[#071A1C] text-white" : "bg-[#F7FAFA] text-[#0F172A]"
      }`}
    >
      <PatientNavbar />

      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link
          href="/doctors"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-[#0F8B8D]"
        >
          <ArrowLeft size={18} />
          {t.back}
        </Link>

        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white md:p-12">
          <p className="font-semibold text-[#FF7A59]">{t.label}</p>

          <h1 className="mt-3 text-4xl font-extrabold">{t.title}</h1>

          <p className="mt-4 text-white/70">{t.desc}</p>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div
            className={`rounded-[2rem] p-6 shadow-xl ring-1 ${
              isDark ? "bg-white/10 ring-white/10" : "bg-white ring-slate-100"
            }`}
          >
            <h2 className="text-2xl font-bold">{t.summary}</h2>

            <div className={isDark ? "mt-6 space-y-4 text-white/75" : "mt-6 space-y-4 text-slate-700"}>
              <p>
                <b>{t.hospital}:</b>{" "}
                {lang === "en"
                  ? "Nalam Rural Care Center"
                  : "நலம் கிராமப்புற பராமரிப்பு மையம்"}
              </p>

              <p>
                <b>{t.doctor}:</b>{" "}
                {lang === "en" ? "Dr. Priya Raman" : "டாக்டர் பிரியா ராமன்"}
              </p>

              <p>
                <b>{t.specialty}:</b> {t.gp}
              </p>

              <p>
                <b>{t.mode}:</b> {t.online}
              </p>

              <p>
                <b>{t.time}:</b> {t.today}
              </p>
            </div>

            <div className="mt-6 rounded-3xl bg-[#E3F1F1] p-5 text-[#0F172A]">
              <p className="text-sm text-slate-500">{t.total}</p>

              <div className="mt-2 flex items-center gap-2 text-4xl font-extrabold text-[#0F8B8D]">
                <IndianRupee />
                300
              </div>
            </div>
          </div>

          <div
            className={`rounded-[2rem] p-6 shadow-xl ring-1 ${
              isDark ? "bg-white/10 ring-white/10" : "bg-white ring-slate-100"
            }`}
          >
            <h2 className="text-2xl font-bold">{t.choose}</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { name: "UPI", icon: Smartphone },
                { name: "Card", icon: CreditCard },
                { name: "Net Banking", icon: Landmark },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    onClick={() => setMethod(item.name)}
                    className={`rounded-3xl p-5 text-left ring-1 ${
                      method === item.name
                        ? "bg-[#0F8B8D] text-white ring-[#0F8B8D]"
                        : isDark
                        ? "bg-[#071A1C] text-white/75 ring-white/10"
                        : "bg-[#F7FAFA] text-slate-600 ring-slate-100"
                    }`}
                  >
                    <Icon />
                    <p className="mt-3 font-bold">{item.name}</p>
                  </button>
                );
              })}
            </div>

            <div
              className={`mt-6 rounded-3xl p-5 ${
                isDark ? "bg-[#071A1C]" : "bg-[#F7FAFA]"
              }`}
            >
              {method === "UPI" && (
                <input
                  placeholder={t.upiPlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-[#0F172A] outline-none"
                />
              )}

              {method === "Card" && (
                <div className="space-y-3">
                  <input
                    placeholder={t.cardPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-[#0F172A] outline-none"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="MM/YY"
                      className="rounded-2xl border border-slate-200 bg-white p-4 text-[#0F172A] outline-none"
                    />

                    <input
                      placeholder="CVV"
                      className="rounded-2xl border border-slate-200 bg-white p-4 text-[#0F172A] outline-none"
                    />
                  </div>
                </div>
              )}

              {method === "Net Banking" && (
                <select className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-[#0F172A] outline-none">
                  <option>{t.bank}</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              )}
            </div>

            <div className={isDark ? "mt-5 flex items-center gap-2 text-sm text-white/60" : "mt-5 flex items-center gap-2 text-sm text-slate-500"}>
              <ShieldCheck className="text-[#0F8B8D]" size={18} />
              {t.demo}
            </div>

            {!paid ? (
              <button
                onClick={() => {
                  localStorage.setItem("nalamPaymentStatus", "paid");
                  setPaid(true);
                }}
                className="mt-6 w-full rounded-2xl bg-[#FF7A59] py-4 font-bold text-white shadow-lg"
              >
                {t.pay}
              </button>
            ) : (
              <div className="mt-6 rounded-3xl bg-green-100 p-5 text-green-700">
                <div className="flex items-center gap-3">
                  <CheckCircle />
                  <p className="font-bold">{t.success}</p>
                </div>

                <Link
                  href="/consultation-type"
                  className="mt-5 block rounded-2xl bg-[#0F8B8D] py-4 text-center font-bold text-white"
                >
                  {t.chooseType}
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}