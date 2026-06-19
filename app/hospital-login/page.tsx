"use client";

import { useRouter } from "next/navigation";
import { Building2, Lock, Mail } from "lucide-react";

export default function HospitalLoginPage() {
  const router = useRouter();

  function handleLogin() {
    localStorage.setItem("nalamHospitalLoggedIn", "true");
    router.push("/hospital-dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FAFA] px-6 text-[#0F172A]">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-100">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E3F1F1] text-[#0F8B8D]">
            <Building2 size={32} />
          </div>
          <h1 className="text-3xl font-extrabold">Hospital Portal</h1>
          <p className="mt-2 text-slate-500">
            Login to manage doctors, appointments and patient records.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-600">
              Hospital Email
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <Mail className="text-[#0F8B8D]" size={20} />
              <input
                placeholder="hospital@nalam.com"
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
            onClick={handleLogin}
            className="w-full rounded-2xl bg-[#0F8B8D] py-4 font-bold text-white"
          >
            Login to Hospital Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}