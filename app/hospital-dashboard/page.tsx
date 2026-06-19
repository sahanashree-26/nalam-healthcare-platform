"use client";

import { useState } from "react";
import {
  CalendarCheck,
  CreditCard,
  FileText,
  Hospital,
  Plus,
  Stethoscope,
  Users,
  UserRound,
  LogOut,
} from "lucide-react";
type Doctor = {
  name: string;
  role: string;
  time: string;
};

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState("doctors");
  function logout() {
   localStorage.clear();
   window.location.href = "/login";
  }

  const [doctors, setDoctors] = useState<Doctor[]>([
    { name: "Dr. Priya Raman", role: "General Physician", time: "Available Today" },
    { name: "Dr. Arjun Kumar", role: "Cardiologist", time: "Tomorrow 10:30 AM" },
    { name: "Dr. Meena Ravi", role: "Pediatrician", time: "Today 8:00 PM" },
  ]);

  function addDoctor() {
    const name = prompt("Enter doctor name");
    if (!name) return;

    const role = prompt("Enter doctor specialty");
    if (!role) return;

    const time = prompt("Enter available time") || "Available Today";

    setDoctors([...doctors, { name, role, time }]);
  }

  function editDoctor(index: number) {
    const current = doctors[index];

    const name = prompt("Edit doctor name", current.name);
    if (!name) return;

    const role = prompt("Edit doctor specialty", current.role);
    if (!role) return;

    const time = prompt("Edit available time", current.time);
    if (!time) return;

    const updatedDoctors = [...doctors];
    updatedDoctors[index] = { name, role, time };
    setDoctors(updatedDoctors);
  }

  function removeDoctor(index: number) {
    const confirmDelete = confirm("Are you sure you want to remove this doctor?");
    if (!confirmDelete) return;

    setDoctors(doctors.filter((_, i) => i !== index));
  }

  return (
    <main className="min-h-screen bg-[#F7FAFA] px-6 py-8 text-[#0F172A]">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white md:p-12">
         <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
           <p className="font-semibold text-[#FF7A59]">
             Hospital Administration
           </p>

           <h1 className="mt-3 text-4xl font-extrabold">
             Nalam Hospital Dashboard
           </h1>

           <p className="mt-4 max-w-2xl text-white/70">
             Manage doctors, appointments, patients,
            prescriptions and reports.
           </p>
          </div>

         <button
          onClick={logout}
          className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 font-bold text-white"
         >
           <LogOut size={18} />
           Logout
          </button>
         </div>
       </section>

        <section className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <Stethoscope className="text-[#0F8B8D]" />
            <p className="mt-3 text-sm text-slate-500">Total Doctors</p>
            <h2 className="text-3xl font-bold">{doctors.length}</h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <Users className="text-[#FF7A59]" />
            <p className="mt-3 text-sm text-slate-500">Patients Today</p>
            <h2 className="text-3xl font-bold">86</h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <CalendarCheck className="text-green-600" />
            <p className="mt-3 text-sm text-slate-500">Appointments</p>
            <h2 className="text-3xl font-bold">42</h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <CreditCard className="text-blue-600" />
            <p className="mt-3 text-sm text-slate-500">Revenue Today</p>
            <h2 className="text-3xl font-bold">₹12,450</h2>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
          <div className="mb-5 flex items-center gap-3">
            <Hospital className="text-[#0F8B8D]" />
            <h2 className="text-2xl font-bold">Hospital Operations</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {[
              ["doctors", "Manage Doctors"],
              ["patients", "View Patients"],
              ["appointments", "Appointments"],
              ["prescriptions", "Prescriptions"],
              ["reports", "Reports"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-2xl p-5 font-bold ${
                  activeTab === key
                    ? "bg-[#0F8B8D] text-white"
                    : "bg-[#E3F1F1] text-[#0F8B8D]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {activeTab === "doctors" && (
          <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Stethoscope className="text-[#0F8B8D]" />
                <h2 className="text-2xl font-bold">Doctor Management</h2>
              </div>

              <button
                onClick={addDoctor}
                className="flex items-center gap-2 rounded-2xl bg-[#0F8B8D] px-5 py-3 font-bold text-white"
              >
                <Plus size={18} /> Add Doctor
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {doctors.map((doctor, index) => (
                <div key={`${doctor.name}-${index}`} className="rounded-3xl bg-[#F7FAFA] p-5">
                  <h3 className="text-xl font-bold">{doctor.name}</h3>
                  <p className="mt-1 text-[#0F8B8D]">{doctor.role}</p>
                  <p className="mt-3 text-sm text-slate-500">{doctor.time}</p>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => editDoctor(index)}
                      className="rounded-xl bg-[#0F8B8D] px-4 py-2 text-sm font-bold text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => removeDoctor(index)}
                      className="rounded-xl border border-red-400 px-4 py-2 text-sm font-bold text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "patients" && (
          <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
            <div className="mb-6 flex items-center gap-3">
              <UserRound className="text-[#FF7A59]" />
              <h2 className="text-2xl font-bold">Patient Records</h2>
            </div>

            <div className="space-y-4">
              {[
                ["Sahana Shree", "AI Notes Submitted", "Dr. Priya Raman"],
                ["Raj Kumar", "Waiting for Consultation", "Dr. Arjun Kumar"],
                ["Meena S", "Prescription Sent", "Dr. Meena Ravi"],
              ].map(([patient, status, doctor]) => (
                <div
                  key={patient}
                  className="grid gap-3 rounded-3xl bg-[#F7FAFA] p-5 md:grid-cols-3"
                >
                  <p className="font-bold">{patient}</p>
                  <p className="text-slate-600">{status}</p>
                  <p className="text-[#0F8B8D]">{doctor}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "appointments" && (
          <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
            <div className="mb-6 flex items-center gap-3">
              <CalendarCheck className="text-green-600" />
              <h2 className="text-2xl font-bold">Today’s Appointments</h2>
            </div>

            <div className="space-y-4">
              {[
                ["6:00 PM", "Sahana Shree", "General Physician", "Paid"],
                ["7:00 PM", "Raj Kumar", "Cardiology", "Paid"],
                ["8:00 PM", "Meena S", "Pediatrics", "Pending"],
              ].map(([time, patient, dept, payment]) => (
                <div
                  key={patient}
                  className="grid gap-3 rounded-3xl bg-[#F7FAFA] p-5 md:grid-cols-4"
                >
                  <p className="font-bold">{time}</p>
                  <p>{patient}</p>
                  <p className="text-slate-600">{dept}</p>
                  <p
                    className={
                      payment === "Paid"
                        ? "font-bold text-green-600"
                        : "font-bold text-yellow-600"
                    }
                  >
                    {payment}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "prescriptions" && (
          <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
            <div className="mb-6 flex items-center gap-3">
              <FileText className="text-[#0F8B8D]" />
              <h2 className="text-2xl font-bold">Prescription Records</h2>
            </div>

            <div className="space-y-4">
              {[
                ["Sahana Shree", "Viral Fever", "Sent"],
                ["Meena S", "Cold & Cough", "Sent"],
                ["Raj Kumar", "Chest Pain Review", "Draft"],
              ].map(([patient, diagnosis, status]) => (
                <div
                  key={patient}
                  className="grid gap-3 rounded-3xl bg-[#F7FAFA] p-5 md:grid-cols-3"
                >
                  <p className="font-bold">{patient}</p>
                  <p className="text-slate-600">{diagnosis}</p>
                  <p className="font-bold text-[#0F8B8D]">{status}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "reports" && (
          <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100">
            <h2 className="text-2xl font-bold">Hospital Reports</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div className="rounded-3xl bg-[#E3F1F1] p-6">
                <p className="text-sm text-slate-600">Monthly Appointments</p>
                <h3 className="mt-2 text-3xl font-bold text-[#0F8B8D]">
                  1,240
                </h3>
              </div>

              <div className="rounded-3xl bg-[#E3F1F1] p-6">
                <p className="text-sm text-slate-600">Monthly Revenue</p>
                <h3 className="mt-2 text-3xl font-bold text-[#0F8B8D]">
                  ₹3.8L
                </h3>
              </div>

              <div className="rounded-3xl bg-[#E3F1F1] p-6">
                <p className="text-sm text-slate-600">AI Notes Processed</p>
                <h3 className="mt-2 text-3xl font-bold text-[#0F8B8D]">
                  860
                </h3>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}