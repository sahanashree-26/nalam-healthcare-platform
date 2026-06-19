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

export default function PaymentPage() {
  const [method, setMethod] = useState("UPI");
  const [paid, setPaid] = useState(false);

  return (
    <main className="min-h-screen bg-[#F7FAFA] px-6 py-8 text-[#0F172A]">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/doctors"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-[#0F8B8D]"
        >
          <ArrowLeft size={18} />
          Back to Doctors
        </Link>

        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white md:p-12">
          <p className="font-semibold text-[#FF7A59]">Secure Payment</p>
          <h1 className="mt-3 text-4xl font-extrabold">
            Pay consultation fee to confirm appointment.
          </h1>
          <p className="mt-4 text-white/70">
            After payment, patient can continue to AI voice consultation.
          </p>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
            <h2 className="text-2xl font-bold">Appointment Summary</h2>

            <div className="mt-6 space-y-4 text-slate-700">
              <p><b>Hospital:</b> Nalam Rural Care Center</p>
              <p><b>Doctor:</b> Dr. Priya Raman</p>
              <p><b>Specialty:</b> General Physician</p>
              <p><b>Mode:</b> Online Consultation</p>
              <p><b>Time:</b> Today, 6:00 PM</p>
            </div>

            <div className="mt-6 rounded-3xl bg-[#E3F1F1] p-5">
              <p className="text-sm text-slate-500">Total Amount</p>
              <div className="mt-2 flex items-center gap-2 text-4xl font-extrabold text-[#0F8B8D]">
                <IndianRupee />
                300
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
            <h2 className="text-2xl font-bold">Choose Payment Method</h2>

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
                        : "bg-[#F7FAFA] text-slate-600 ring-slate-100"
                    }`}
                  >
                    <Icon />
                    <p className="mt-3 font-bold">{item.name}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl bg-[#F7FAFA] p-5">
              {method === "UPI" && (
                <input
                  placeholder="Enter UPI ID: name@upi"
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none"
                />
              )}

              {method === "Card" && (
                <div className="space-y-3">
                  <input
                    placeholder="Card Number"
                    className="w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="MM/YY"
                      className="rounded-2xl border border-slate-200 bg-white p-4 outline-none"
                    />
                    <input
                      placeholder="CVV"
                      className="rounded-2xl border border-slate-200 bg-white p-4 outline-none"
                    />
                  </div>
                </div>
              )}

              {method === "Net Banking" && (
                <select className="w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none">
                  <option>Select Bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              )}
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheck className="text-[#0F8B8D]" size={18} />
              Payment is shown as demo now. Razorpay can be connected later.
            </div>

            {!paid ? (
              <button
                onClick={() => {
                  localStorage.setItem("nalamPaymentStatus", "paid");
                  setPaid(true);
                }}
                className="mt-6 w-full rounded-2xl bg-[#FF7A59] py-4 font-bold text-white shadow-lg"
              >
                Pay ₹300
              </button>
            ) : (
              <div className="mt-6 rounded-3xl bg-green-100 p-5 text-green-700">
                <div className="flex items-center gap-3">
                  <CheckCircle />
                  <p className="font-bold">Payment Successful</p>
                </div>

                <Link
                  href="/appointment"
                  className="mt-5 block rounded-2xl bg-[#0F8B8D] py-4 text-center font-bold text-white"
                >
                  Continue to AI Consultation
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}