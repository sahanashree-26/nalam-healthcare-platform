"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Lock,
  Mail,
  Stethoscope,
  User,
} from "lucide-react";

type Role = "Patient" | "Doctor" | "Hospital";
type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [mode, setMode] = useState<Mode>("login");

  function goToDashboard() {
    if (selectedRole === "Patient") router.push("/patient-home");
    if (selectedRole === "Doctor") router.push("/doctor-dashboard");
    if (selectedRole === "Hospital") router.push("/hospital-dashboard");
  }

  const roles = [
    {
      name: "Patient" as Role,
      icon: User,
      color: "#0F8B8D",
      bg: "#E3F1F1",
      text: "Search hospitals, consult doctors, book appointments and manage prescriptions.",
    },
    {
      name: "Doctor" as Role,
      icon: Stethoscope,
      color: "#FF7A59",
      bg: "#FFF0EB",
      text: "Review AI consultation notes, manage appointments and send digital prescriptions.",
    },
    {
      name: "Hospital" as Role,
      icon: Building2,
      color: "#0A2426",
      bg: "#EAF7F7",
      text: "Manage doctors, patients, appointments, reports and hospital operations.",
    },
  ];

  if (selectedRole) {
    const activeRole = roles.find((role) => role.name === selectedRole)!;
    const Icon = activeRole.icon;

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FAFA] px-6 py-10 text-[#0F172A]">
        <div className="w-full max-w-md rounded-[2rem] border-2 border-slate-200 bg-white p-8 shadow-2xl">
          <button
            onClick={() => setSelectedRole(null)}
            className="mb-6 flex items-center gap-2 font-bold text-[#0F8B8D]"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="text-center">
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl"
              style={{ backgroundColor: activeRole.bg, color: activeRole.color }}
            >
              <Icon size={40} />
            </div>

            <h1 className="mt-6 text-3xl font-black text-black">
              {selectedRole} {mode === "login" ? "Login" : "Sign Up"}
            </h1>

            <p className="mt-3 font-semibold text-slate-800">
              {mode === "login"
                ? `Login to continue as ${selectedRole}.`
                : `Create your ${selectedRole.toLowerCase()} account.`}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
            <button
              onClick={() => setMode("login")}
              className={`rounded-xl py-3 font-black ${
                mode === "login"
                  ? "bg-white text-[#0F8B8D] shadow"
                  : "text-slate-700"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setMode("signup")}
              className={`rounded-xl py-3 font-black ${
                mode === "signup"
                  ? "bg-white text-[#0F8B8D] shadow"
                  : "text-slate-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {mode === "signup" && (
              <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-300 bg-white px-4 py-4">
                <User className="text-[#0F8B8D]" size={20} />
                <input
                  placeholder={
                    selectedRole === "Hospital"
                      ? "Hospital Name"
                      : selectedRole === "Doctor"
                      ? "Doctor Name"
                      : "Full Name"
                  }
                  className="w-full bg-transparent font-semibold text-black outline-none placeholder:text-slate-500"
                />
              </div>
            )}

            <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-300 bg-white px-4 py-4">
              <Mail className="text-[#0F8B8D]" size={20} />
              <input
                placeholder="Email Address"
                className="w-full bg-transparent font-semibold text-black outline-none placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-300 bg-white px-4 py-4">
              <Lock className="text-[#0F8B8D]" size={20} />
              <input
                type="password"
                placeholder={mode === "login" ? "Password" : "Create Password"}
                className="w-full bg-transparent font-semibold text-black outline-none placeholder:text-slate-500"
              />
            </div>

            {mode === "signup" && selectedRole === "Doctor" && (
              <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-300 bg-white px-4 py-4">
                <Stethoscope className="text-[#FF7A59]" size={20} />
                <input
                  placeholder="Specialization"
                  className="w-full bg-transparent font-semibold text-black outline-none placeholder:text-slate-500"
                />
              </div>
            )}

            <button
              onClick={goToDashboard}
              className="w-full rounded-2xl bg-[#0F8B8D] py-4 text-lg font-black text-white shadow-lg"
            >
              {mode === "login" ? "Login" : "Create Account"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FAFA] px-6 py-10">
      <div className="w-full max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black tracking-tight text-black">
            Welcome to Nalam
          </h1>

          <p className="mt-4 text-lg font-bold text-slate-900">
            Select your role to continue
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <div
                key={role.name}
                className="rounded-[2rem] border-2 border-slate-200 bg-white p-8 shadow-2xl"
              >
                <div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl"
                  style={{ backgroundColor: role.bg, color: role.color }}
                >
                  <Icon size={40} />
                </div>

                <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                  {role.name}
                </h2>

                <p className="mt-4 text-center text-base font-semibold text-slate-900">
                  {role.text}
                </p>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => {
                      setSelectedRole(role.name);
                      setMode("login");
                    }}
                    className="w-full rounded-2xl py-4 text-lg font-bold text-white"
                    style={{ backgroundColor: role.color }}
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      setSelectedRole(role.name);
                      setMode("signup");
                    }}
                    className="w-full rounded-2xl border-2 py-4 text-lg font-bold"
                    style={{
                      borderColor: role.color,
                      color: role.color,
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}