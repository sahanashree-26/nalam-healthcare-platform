"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail, Stethoscope } from "lucide-react";

export default function DoctorLoginPage() {
  const router = useRouter();

  function handleDoctorLogin() {
    localStorage.setItem("nalamDoctorLoggedIn", "true");
    router.push("/doctor-dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F7FAFA] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-[#0F8B8D] font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-100">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E3F1F1] text-[#0F8B8D]">
              <Stethoscope size={30} />
            </div>

            <h1 className="text-3xl font-extrabold">
              Doctor Portal
            </h1>

            <p className="mt-2 text-slate-500">
              Login to access appointments and patient AI notes.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-600">
                Doctor Email
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <Mail className="text-[#0F8B8D]" size={20} />
                <input
                  placeholder="doctor@nalam.com"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Password
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <Lock className="text-[#0F8B8D]" size={20} />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleDoctorLogin}
              className="w-full rounded-2xl bg-[#0F8B8D] py-4 font-bold text-white"
            >
              Login to Doctor Dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}