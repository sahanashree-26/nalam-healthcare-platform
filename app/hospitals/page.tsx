"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  Clock,
  Hospital,
  Languages,
  MapPin,
  Search,
  Star,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";

const hospitals = [
  {
    id: 1,
    name: "Nalam Rural Care Center",
    location: "Salem, Tamil Nadu",
    area: "salem",
    distance: "2.4 km",
    rating: "4.8",
    doctors: [
      {
        name: "Dr. Priya Raman",
        specialty: "General Physician",
        exp: "8 years",
        lang: "Tamil, English",
        fee: "₹300",
        time: "Today, 6:00 PM",
      },
      {
        name: "Dr. Karthik Vel",
        specialty: "Diabetologist",
        exp: "10 years",
        lang: "Tamil",
        fee: "₹400",
        time: "Today, 8:00 PM",
      },
    ],
  },
  {
    id: 2,
    name: "Green Valley Multi-Speciality Hospital",
    location: "Erode, Tamil Nadu",
    area: "erode",
    distance: "5.1 km",
    rating: "4.6",
    doctors: [
      {
        name: "Dr. Arjun Kumar",
        specialty: "Cardiologist",
        exp: "12 years",
        lang: "Tamil, English",
        fee: "₹650",
        time: "Tomorrow, 10:30 AM",
      },
      {
        name: "Dr. Meena Ravi",
        specialty: "Pediatrician",
        exp: "10 years",
        lang: "Tamil, English",
        fee: "₹450",
        time: "Today, 7:30 PM",
      },
    ],
  },
  {
    id: 3,
    name: "Muthu Family Health Clinic",
    location: "Namakkal, Tamil Nadu",
    area: "namakkal",
    distance: "7.8 km",
    rating: "4.7",
    doctors: [
      {
        name: "Dr. Selvi Raj",
        specialty: "Family Doctor",
        exp: "7 years",
        lang: "Tamil",
        fee: "₹250",
        time: "Today, 5:30 PM",
      },
      {
        name: "Dr. Naveen Kumar",
        specialty: "ENT Specialist",
        exp: "9 years",
        lang: "Tamil, English",
        fee: "₹350",
        time: "Tomorrow, 9:00 AM",
      },
    ],
  },
];

export default function HospitalsPage() {
  const [locationSearch, setLocationSearch] = useState("");
  const [hospitalSearch, setHospitalSearch] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);

  const filteredHospitals = hospitals.filter((hospital) => {
    const locationMatch =
      locationSearch.trim() === "" ||
      hospital.area.toLowerCase().includes(locationSearch.toLowerCase()) ||
      hospital.location.toLowerCase().includes(locationSearch.toLowerCase());

    const hospitalMatch =
      hospitalSearch.trim() === "" ||
      hospital.name.toLowerCase().includes(hospitalSearch.toLowerCase());

    return locationMatch && hospitalMatch;
  });

  const activeHospital = hospitals.find((h) => h.id === selectedHospital);

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
          <p className="font-semibold text-[#FF7A59]">Hospital Search</p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Find hospitals near your location.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Enter your location to see nearby hospitals, or search directly by
            hospital name.
          </p>

          <div className="mt-8 grid gap-3 rounded-3xl bg-white p-4 md:grid-cols-[1fr_1fr]">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-[#0F172A]">
              <MapPin className="text-[#0F8B8D]" />
              <input
                value={locationSearch}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setSelectedHospital(null);
                }}
                placeholder="Enter location: Salem, Erode, Namakkal"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-[#0F172A]">
              <Search className="text-[#0F8B8D]" />
              <input
                value={hospitalSearch}
                onChange={(e) => {
                  setHospitalSearch(e.target.value);
                  setSelectedHospital(null);
                }}
                placeholder="Search hospital name"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {filteredHospitals.map((hospital) => (
            <button
              key={hospital.id}
              onClick={() => setSelectedHospital(hospital.id)}
              className={`rounded-[2rem] p-6 text-left shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-xl ${
                selectedHospital === hospital.id
                  ? "bg-[#0A2426] text-white ring-[#0F8B8D]"
                  : "bg-white text-[#0F172A] ring-slate-100"
              }`}
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E3F1F1] text-[#0F8B8D]">
                <Hospital size={32} />
              </div>

              <h2 className="text-2xl font-bold">{hospital.name}</h2>
              <p
                className={`mt-2 ${
                  selectedHospital === hospital.id
                    ? "text-white/70"
                    : "text-slate-500"
                }`}
              >
                {hospital.location}
              </p>

              <div
                className={`mt-5 space-y-3 text-sm ${
                  selectedHospital === hospital.id
                    ? "text-white/70"
                    : "text-slate-600"
                }`}
              >
                <p className="flex items-center gap-2">
                  <MapPin size={16} /> {hospital.distance}
                </p>
                <p className="flex items-center gap-2">
                  <Star size={16} /> {hospital.rating}
                </p>
                <p className="flex items-center gap-2">
                  <Users size={16} /> {hospital.doctors.length} Doctors
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} /> Open Today
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-[#FF7A59] px-4 py-3 text-center font-semibold text-white">
                {selectedHospital === hospital.id ? "Selected" : "View Doctors"}
              </div>
            </button>
          ))}
        </section>

        {filteredHospitals.length === 0 && (
          <div className="mt-10 rounded-3xl bg-yellow-100 p-6 text-yellow-800">
            No hospitals found for this search.
          </div>
        )}

        {activeHospital && (
          <section className="mt-12 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100 md:p-8">
            <div className="mb-8">
              <p className="font-semibold text-[#FF7A59]">Doctors Available</p>
              <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
                Doctors at {activeHospital.name}
              </h2>
              <p className="mt-2 text-slate-500">
                Select a doctor and continue to appointment booking.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {activeHospital.doctors.map((doctor) => (
                <div
                  key={doctor.name}
                  className="rounded-3xl border border-slate-100 bg-[#F7FAFA] p-5"
                >
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0F8B8D] to-[#2563EB] text-white">
                      <Stethoscope size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{doctor.name}</h4>
                      <p className="font-semibold text-[#0F8B8D]">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-slate-600">
                    <p>Experience: {doctor.exp}</p>
                    <p className="flex items-center gap-2">
                      <Languages size={16} /> {doctor.lang}
                    </p>
                    <p className="flex items-center gap-2">
                      <Video size={16} /> Online Consultation
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarCheck size={16} /> {doctor.time}
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl bg-[#E3F1F1] p-4">
                    <p className="text-sm text-slate-500">Consultation Fee</p>
                    <p className="text-2xl font-bold text-[#0F8B8D]">
                      {doctor.fee}
                    </p>
                  </div>

                  <Link
                    href="/payment"
                    className="mt-5 block rounded-2xl bg-[#FF7A59] py-3 text-center font-semibold text-white"
                  >
                    Book Appointment
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}