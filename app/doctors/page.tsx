"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalendarCheck,
  Languages,
  Search,
  Star,
  Stethoscope,
  Video,
} from "lucide-react";

import PatientNavbar from "../components/PatientNavbar";
import { useApp } from "../context/AppContext";

const doctors = [
  {
    name: "Dr. Priya Raman",
    taName: "டாக்டர் பிரியா ராமன்",
    specialty: "General Physician",
    taSpecialty: "பொது மருத்துவர்",
    hospital: "Nalam Rural Care Center",
    taHospital: "நலம் கிராமப்புற பராமரிப்பு மையம்",
    location: "Salem",
    taLocation: "சேலம்",
    experience: "8 years",
    taExperience: "8 ஆண்டுகள்",
    languages: "Tamil, English",
    taLanguages: "தமிழ், ஆங்கிலம்",
    fee: "₹300",
    rating: "4.9",
    available: "Today, 6:00 PM",
    taAvailable: "இன்று, மாலை 6:00",
  },
  {
    name: "Dr. Arjun Kumar",
    taName: "டாக்டர் அர்ஜுன் குமார்",
    specialty: "Cardiologist",
    taSpecialty: "இதய நிபுணர்",
    hospital: "Green Valley Multi-Speciality Hospital",
    taHospital: "கிரீன் வேலி பல்நோக்கு மருத்துவமனை",
    location: "Erode",
    taLocation: "ஈரோடு",
    experience: "12 years",
    taExperience: "12 ஆண்டுகள்",
    languages: "Tamil, English",
    taLanguages: "தமிழ், ஆங்கிலம்",
    fee: "₹650",
    rating: "4.8",
    available: "Tomorrow, 10:30 AM",
    taAvailable: "நாளை, காலை 10:30",
  },
  {
    name: "Dr. Meena Ravi",
    taName: "டாக்டர் மீனா ரவி",
    specialty: "Pediatrician",
    taSpecialty: "குழந்தை மருத்துவர்",
    hospital: "Green Valley Multi-Speciality Hospital",
    taHospital: "கிரீன் வேலி பல்நோக்கு மருத்துவமனை",
    location: "Erode",
    taLocation: "ஈரோடு",
    experience: "10 years",
    taExperience: "10 ஆண்டுகள்",
    languages: "Tamil, English",
    taLanguages: "தமிழ், ஆங்கிலம்",
    fee: "₹450",
    rating: "4.7",
    available: "Today, 8:00 PM",
    taAvailable: "இன்று, இரவு 8:00",
  },
  {
    name: "Dr. Selvi Raj",
    taName: "டாக்டர் செல்வி ராஜ்",
    specialty: "Family Doctor",
    taSpecialty: "குடும்ப மருத்துவர்",
    hospital: "Muthu Family Health Clinic",
    taHospital: "முத்து குடும்ப சுகாதார மையம்",
    location: "Namakkal",
    taLocation: "நாமக்கல்",
    experience: "7 years",
    taExperience: "7 ஆண்டுகள்",
    languages: "Tamil",
    taLanguages: "தமிழ்",
    fee: "₹250",
    rating: "4.6",
    available: "Today, 5:30 PM",
    taAvailable: "இன்று, மாலை 5:30",
  },
];

export default function DoctorsPage() {
  const [doctorSearch, setDoctorSearch] = useState("");
  const { lang, isDark } = useApp();

  const t = {
    en: {
      title: "Search doctors by name, specialty, hospital, or city.",
      subtitle: "Find trusted doctors and book an online consultation.",
      label: "Doctor Search",
      placeholder: "Search doctor, specialty, hospital, or city",
      hospital: "Hospital",
      city: "City",
      experience: "Experience",
      rating: "Rating",
      online: "Online Consultation",
      available: "Available",
      fee: "Consultation Fee",
      book: "Book Appointment",
      noDoctors: "No doctors found for this search.",
    },
    ta: {
      title: "பெயர், சிறப்பு, மருத்துவமனை அல்லது நகரம் மூலம் மருத்துவர்களை தேடுங்கள்.",
      subtitle: "நம்பகமான மருத்துவர்களை கண்டறிந்து ஆன்லைன் ஆலோசனை பதிவு செய்யுங்கள்.",
      label: "மருத்துவர் தேடல்",
      placeholder: "மருத்துவர், சிறப்பு, மருத்துவமனை அல்லது நகரம் தேடுங்கள்",
      hospital: "மருத்துவமனை",
      city: "நகரம்",
      experience: "அனுபவம்",
      rating: "மதிப்பீடு",
      online: "ஆன்லைன் ஆலோசனை",
      available: "கிடைக்கும் நேரம்",
      fee: "ஆலோசனை கட்டணம்",
      book: "அப்பாயின்மெண்ட் பதிவு செய்",
      noDoctors: "இந்த தேடலுக்கு மருத்துவர்கள் கிடைக்கவில்லை.",
    },
  }[lang];

  const filteredDoctors = doctors.filter((doctor) => {
    const q = doctorSearch.toLowerCase();

    return (
      doctor.name.toLowerCase().includes(q) ||
      doctor.taName.includes(doctorSearch) ||
      doctor.specialty.toLowerCase().includes(q) ||
      doctor.taSpecialty.includes(doctorSearch) ||
      doctor.hospital.toLowerCase().includes(q) ||
      doctor.taHospital.includes(doctorSearch) ||
      doctor.location.toLowerCase().includes(q) ||
      doctor.taLocation.includes(doctorSearch)
    );
  });

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

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            {t.title}
          </h1>

          <p className="mt-5 max-w-2xl text-white/70">{t.subtitle}</p>

          <div className="mt-8 rounded-3xl bg-white p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-[#0F172A]">
              <Search className="text-[#0F8B8D]" />

              <input
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                placeholder={t.placeholder}
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500"
              />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.name}
              className={`rounded-3xl p-6 shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-xl ${
                isDark
                  ? "bg-white/10 ring-white/10"
                  : "bg-white ring-slate-100"
              }`}
            >
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#0F8B8D] to-[#2563EB] text-white">
                <Stethoscope size={34} />
              </div>

              <h2 className="text-2xl font-bold">
                {lang === "en" ? doctor.name : doctor.taName}
              </h2>

              <p className="mt-1 font-semibold text-[#0F8B8D]">
                {lang === "en" ? doctor.specialty : doctor.taSpecialty}
              </p>

              <div
                className={`mt-5 space-y-3 text-sm ${
                  isDark ? "text-white/75" : "text-slate-600"
                }`}
              >
                <p>
                  <b>{t.hospital}:</b>{" "}
                  {lang === "en" ? doctor.hospital : doctor.taHospital}
                </p>

                <p>
                  <b>{t.city}:</b>{" "}
                  {lang === "en" ? doctor.location : doctor.taLocation}
                </p>

                <p>
                  <b>{t.experience}:</b>{" "}
                  {lang === "en" ? doctor.experience : doctor.taExperience}
                </p>

                <p className="flex items-center gap-2">
                  <Languages size={16} />{" "}
                  {lang === "en" ? doctor.languages : doctor.taLanguages}
                </p>

                <p className="flex items-center gap-2">
                  <Star size={16} /> {t.rating}: {doctor.rating}
                </p>

                <p className="flex items-center gap-2">
                  <Video size={16} /> {t.online}
                </p>

                <p className="flex items-center gap-2">
                  <CalendarCheck size={16} /> {t.available}:{" "}
                  {lang === "en" ? doctor.available : doctor.taAvailable}
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-[#E3F1F1] p-4">
                <p className="text-sm font-semibold text-slate-600">{t.fee}</p>
                <p className="text-2xl font-bold text-[#0F8B8D]">
                  {doctor.fee}
                </p>
              </div>

              <Link
                href="/payment"
                className="mt-6 block rounded-2xl bg-[#FF7A59] py-3 text-center font-bold text-white"
              >
                {t.book}
              </Link>
            </div>
          ))}
        </section>

        {filteredDoctors.length === 0 && (
          <div className="mt-10 rounded-3xl bg-yellow-100 p-6 font-bold text-yellow-800">
            {t.noDoctors}
          </div>
        )}
      </div>
    </main>
  );
}