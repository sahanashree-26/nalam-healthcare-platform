"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  Languages,
  Search,
  Star,
  Stethoscope,
  Video,
} from "lucide-react";

const doctors = [
  {
    name: "Dr. Priya Raman",
    specialty: "General Physician",
    hospital: "Nalam Rural Care Center",
    location: "Salem",
    experience: "8 years",
    languages: "Tamil, English",
    fee: "₹300",
    rating: "4.9",
    available: "Today, 6:00 PM",
  },
  {
    name: "Dr. Arjun Kumar",
    specialty: "Cardiologist",
    hospital: "Green Valley Multi-Speciality Hospital",
    location: "Erode",
    experience: "12 years",
    languages: "Tamil, English",
    fee: "₹650",
    rating: "4.8",
    available: "Tomorrow, 10:30 AM",
  },
  {
    name: "Dr. Meena Ravi",
    specialty: "Pediatrician",
    hospital: "Green Valley Multi-Speciality Hospital",
    location: "Erode",
    experience: "10 years",
    languages: "Tamil, English",
    fee: "₹450",
    rating: "4.7",
    available: "Today, 8:00 PM",
  },
  {
    name: "Dr. Selvi Raj",
    specialty: "Family Doctor",
    hospital: "Muthu Family Health Clinic",
    location: "Namakkal",
    experience: "7 years",
    languages: "Tamil",
    fee: "₹250",
    rating: "4.6",
    available: "Today, 5:30 PM",
  },
];

export default function DoctorsPage() {
  const [doctorSearch, setDoctorSearch] = useState("");

  const filteredDoctors = doctors.filter((doctor) => {
    const q = doctorSearch.toLowerCase();

    return (
      doctor.name.toLowerCase().includes(q) ||
      doctor.specialty.toLowerCase().includes(q) ||
      doctor.hospital.toLowerCase().includes(q) ||
      doctor.location.toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-[#F7FAFA] px-6 py-8 text-[#0F172A]">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/patient-home"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-[#0F8B8D]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white md:p-12">
          <p className="font-semibold text-[#FF7A59]">Doctor Search</p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Search doctors by name, specialty, hospital, or city.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Find trusted doctors and book an online consultation.
          </p>

          <div className="mt-8 rounded-3xl bg-white p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-[#0F172A]">
              <Search className="text-[#0F8B8D]" />
              <input
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                placeholder="Search doctor, specialty, hospital, or city"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.name}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#0F8B8D] to-[#2563EB] text-white">
                <Stethoscope size={34} />
              </div>

              <h2 className="text-2xl font-bold">{doctor.name}</h2>
              <p className="mt-1 font-semibold text-[#0F8B8D]">
                {doctor.specialty}
              </p>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <p>
                  <b>Hospital:</b> {doctor.hospital}
                </p>
                <p>
                  <b>City:</b> {doctor.location}
                </p>
                <p>Experience: {doctor.experience}</p>
                <p className="flex items-center gap-2">
                  <Languages size={16} /> {doctor.languages}
                </p>
                <p className="flex items-center gap-2">
                  <Star size={16} /> Rating: {doctor.rating}
                </p>
                <p className="flex items-center gap-2">
                  <Video size={16} /> Online Consultation
                </p>
                <p className="flex items-center gap-2">
                  <CalendarCheck size={16} /> Available: {doctor.available}
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-[#E3F1F1] p-4">
                <p className="text-sm text-slate-500">Consultation Fee</p>
                <p className="text-2xl font-bold text-[#0F8B8D]">
                  {doctor.fee}
                </p>
              </div>

              <Link
                href="/payment"
                className="mt-6 block rounded-2xl bg-[#FF7A59] py-3 text-center font-semibold text-white"
              >
                Book Appointment
              </Link>
            </div>
          ))}
        </section>

        {filteredDoctors.length === 0 && (
          <div className="mt-10 rounded-3xl bg-yellow-100 p-6 text-yellow-800">
            No doctors found for this search.
          </div>
        )}
      </div>
    </main>
  );
}