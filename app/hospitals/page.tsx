"use client";

import Link from "next/link";
import { useState } from "react";
import {
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

import PatientNavbar from "../components/PatientNavbar";
import { useApp } from "../context/AppContext";

const hospitals = [
  {
    id: 1,
    name: "Nalam Rural Care Center",
    taName: "நலம் கிராமப்புற பராமரிப்பு மையம்",
    location: "Salem, Tamil Nadu",
    taLocation: "சேலம், தமிழ்நாடு",
    area: "salem",
    distance: "2.4 km",
    rating: "4.8",
    doctors: [
      {
        name: "Dr. Priya Raman",
        taName: "டாக்டர் பிரியா ராமன்",
        specialty: "General Physician",
        taSpecialty: "பொது மருத்துவர்",
        exp: "8 years",
        taExp: "8 ஆண்டுகள்",
        lang: "Tamil, English",
        taLang: "தமிழ், ஆங்கிலம்",
        fee: "₹300",
        time: "Today, 6:00 PM",
        taTime: "இன்று, மாலை 6:00",
      },
      {
        name: "Dr. Karthik Vel",
        taName: "டாக்டர் கார்த்திக் வேல்",
        specialty: "Diabetologist",
        taSpecialty: "சர்க்கரை நோய் நிபுணர்",
        exp: "10 years",
        taExp: "10 ஆண்டுகள்",
        lang: "Tamil",
        taLang: "தமிழ்",
        fee: "₹400",
        time: "Today, 8:00 PM",
        taTime: "இன்று, இரவு 8:00",
      },
    ],
  },
  {
    id: 2,
    name: "Green Valley Multi-Speciality Hospital",
    taName: "கிரீன் வேலி பல்நோக்கு மருத்துவமனை",
    location: "Erode, Tamil Nadu",
    taLocation: "ஈரோடு, தமிழ்நாடு",
    area: "erode",
    distance: "5.1 km",
    rating: "4.6",
    doctors: [
      {
        name: "Dr. Arjun Kumar",
        taName: "டாக்டர் அர்ஜுன் குமார்",
        specialty: "Cardiologist",
        taSpecialty: "இதய நிபுணர்",
        exp: "12 years",
        taExp: "12 ஆண்டுகள்",
        lang: "Tamil, English",
        taLang: "தமிழ், ஆங்கிலம்",
        fee: "₹650",
        time: "Tomorrow, 10:30 AM",
        taTime: "நாளை, காலை 10:30",
      },
      {
        name: "Dr. Meena Ravi",
        taName: "டாக்டர் மீனா ரவி",
        specialty: "Pediatrician",
        taSpecialty: "குழந்தை மருத்துவர்",
        exp: "10 years",
        taExp: "10 ஆண்டுகள்",
        lang: "Tamil, English",
        taLang: "தமிழ், ஆங்கிலம்",
        fee: "₹450",
        time: "Today, 7:30 PM",
        taTime: "இன்று, மாலை 7:30",
      },
    ],
  },
  {
    id: 3,
    name: "Muthu Family Health Clinic",
    taName: "முத்து குடும்ப சுகாதார மையம்",
    location: "Namakkal, Tamil Nadu",
    taLocation: "நாமக்கல், தமிழ்நாடு",
    area: "namakkal",
    distance: "7.8 km",
    rating: "4.7",
    doctors: [
      {
        name: "Dr. Selvi Raj",
        taName: "டாக்டர் செல்வி ராஜ்",
        specialty: "Family Doctor",
        taSpecialty: "குடும்ப மருத்துவர்",
        exp: "7 years",
        taExp: "7 ஆண்டுகள்",
        lang: "Tamil",
        taLang: "தமிழ்",
        fee: "₹250",
        time: "Today, 5:30 PM",
        taTime: "இன்று, மாலை 5:30",
      },
      {
        name: "Dr. Naveen Kumar",
        taName: "டாக்டர் நவீன் குமார்",
        specialty: "ENT Specialist",
        taSpecialty: "காது மூக்கு தொண்டை நிபுணர்",
        exp: "9 years",
        taExp: "9 ஆண்டுகள்",
        lang: "Tamil, English",
        taLang: "தமிழ், ஆங்கிலம்",
        fee: "₹350",
        time: "Tomorrow, 9:00 AM",
        taTime: "நாளை, காலை 9:00",
      },
    ],
  },
];

export default function HospitalsPage() {
  const [locationSearch, setLocationSearch] = useState("");
  const [hospitalSearch, setHospitalSearch] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);

  const { lang, isDark } = useApp();

  const t = {
    en: {
      label: "Hospital Search",
      title: "Find hospitals near your location.",
      desc: "Enter your location to see nearby hospitals, or search directly by hospital name.",
      locationPlaceholder: "Enter location: Salem, Erode, Namakkal",
      hospitalPlaceholder: "Search hospital name",
      doctors: "Doctors",
      open: "Open Today",
      selected: "Selected",
      viewDoctors: "View Doctors",
      noHospitals: "No hospitals found for this search.",
      doctorsAvailable: "Doctors Available",
      doctorsAt: "Doctors at",
      chooseDoctor: "Select a doctor and continue to appointment booking.",
      experience: "Experience",
      online: "Online Consultation",
      fee: "Consultation Fee",
      book: "Book Appointment",
    },
    ta: {
      label: "மருத்துவமனை தேடல்",
      title: "உங்கள் இடத்திற்கு அருகிலுள்ள மருத்துவமனைகளை கண்டறியுங்கள்.",
      desc: "உங்கள் இடத்தை உள்ளிடவும் அல்லது மருத்துவமனை பெயரால் தேடவும்.",
      locationPlaceholder: "இடம்: சேலம், ஈரோடு, நாமக்கல்",
      hospitalPlaceholder: "மருத்துவமனை பெயர் தேடுங்கள்",
      doctors: "மருத்துவர்கள்",
      open: "இன்று திறந்திருக்கும்",
      selected: "தேர்ந்தெடுக்கப்பட்டது",
      viewDoctors: "மருத்துவர்களை பார்க்க",
      noHospitals: "இந்த தேடலுக்கு மருத்துவமனைகள் கிடைக்கவில்லை.",
      doctorsAvailable: "கிடைக்கும் மருத்துவர்கள்",
      doctorsAt: "மருத்துவர்கள் -",
      chooseDoctor: "மருத்துவரை தேர்வு செய்து அப்பாயின்மெண்ட் பதிவு செய்யுங்கள்.",
      experience: "அனுபவம்",
      online: "ஆன்லைன் ஆலோசனை",
      fee: "ஆலோசனை கட்டணம்",
      book: "அப்பாயின்மெண்ட் பதிவு செய்",
    },
  }[lang];

  const filteredHospitals = hospitals.filter((hospital) => {
    const qLocation = locationSearch.toLowerCase();
    const qHospital = hospitalSearch.toLowerCase();

    const locationMatch =
      locationSearch.trim() === "" ||
      hospital.area.toLowerCase().includes(qLocation) ||
      hospital.location.toLowerCase().includes(qLocation) ||
      hospital.taLocation.includes(locationSearch);

    const hospitalMatch =
      hospitalSearch.trim() === "" ||
      hospital.name.toLowerCase().includes(qHospital) ||
      hospital.taName.includes(hospitalSearch);

    return locationMatch && hospitalMatch;
  });

  const activeHospital = hospitals.find((h) => h.id === selectedHospital);

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

          <p className="mt-5 max-w-2xl text-white/70">{t.desc}</p>

          <div className="mt-8 grid gap-3 rounded-3xl bg-white p-4 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-[#0F172A]">
              <MapPin className="text-[#0F8B8D]" />
              <input
                value={locationSearch}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setSelectedHospital(null);
                }}
                placeholder={t.locationPlaceholder}
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500"
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
                placeholder={t.hospitalPlaceholder}
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500"
              />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {filteredHospitals.map((hospital) => {
            const selected = selectedHospital === hospital.id;

            return (
              <button
                key={hospital.id}
                onClick={() => setSelectedHospital(hospital.id)}
                className={`rounded-[2rem] p-6 text-left shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-xl ${
                  selected
                    ? "bg-[#0A2426] text-white ring-[#0F8B8D]"
                    : isDark
                    ? "bg-white/10 text-white ring-white/10"
                    : "bg-white text-[#0F172A] ring-slate-100"
                }`}
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E3F1F1] text-[#0F8B8D]">
                  <Hospital size={32} />
                </div>

                <h2 className="text-2xl font-bold">
                  {lang === "en" ? hospital.name : hospital.taName}
                </h2>

                <p
                  className={`mt-2 ${
                    selected
                      ? "text-white/70"
                      : isDark
                      ? "text-white/70"
                      : "text-slate-500"
                  }`}
                >
                  {lang === "en" ? hospital.location : hospital.taLocation}
                </p>

                <div
                  className={`mt-5 space-y-3 text-sm ${
                    selected || isDark ? "text-white/70" : "text-slate-600"
                  }`}
                >
                  <p className="flex items-center gap-2">
                    <MapPin size={16} /> {hospital.distance}
                  </p>
                  <p className="flex items-center gap-2">
                    <Star size={16} /> {hospital.rating}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={16} /> {hospital.doctors.length} {t.doctors}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={16} /> {t.open}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl bg-[#FF7A59] px-4 py-3 text-center font-bold text-white">
                  {selected ? t.selected : t.viewDoctors}
                </div>
              </button>
            );
          })}
        </section>

        {filteredHospitals.length === 0 && (
          <div className="mt-10 rounded-3xl bg-yellow-100 p-6 font-bold text-yellow-800">
            {t.noHospitals}
          </div>
        )}

        {activeHospital && (
          <section
            className={`mt-12 rounded-[2rem] p-6 shadow-xl ring-1 md:p-8 ${
              isDark ? "bg-white/10 ring-white/10" : "bg-white ring-slate-100"
            }`}
          >
            <div className="mb-8">
              <p className="font-semibold text-[#FF7A59]">
                {t.doctorsAvailable}
              </p>

              <h2
                className={`mt-2 text-3xl font-bold ${
                  isDark ? "text-white" : "text-[#0F172A]"
                }`}
              >
                {t.doctorsAt}{" "}
                {lang === "en" ? activeHospital.name : activeHospital.taName}
              </h2>

              <p className={isDark ? "mt-2 text-white/70" : "mt-2 text-slate-500"}>
                {t.chooseDoctor}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {activeHospital.doctors.map((doctor) => (
                <div
                  key={doctor.name}
                  className={`rounded-3xl border p-5 ${
                    isDark
                      ? "border-white/10 bg-[#071A1C]"
                      : "border-slate-100 bg-[#F7FAFA]"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0F8B8D] to-[#2563EB] text-white">
                      <Stethoscope size={24} />
                    </div>

                    <div>
                      <h4 className="text-xl font-bold">
                        {lang === "en" ? doctor.name : doctor.taName}
                      </h4>
                      <p className="font-semibold text-[#0F8B8D]">
                        {lang === "en" ? doctor.specialty : doctor.taSpecialty}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`mt-5 space-y-3 text-sm ${
                      isDark ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    <p>
                      {t.experience}:{" "}
                      {lang === "en" ? doctor.exp : doctor.taExp}
                    </p>
                    <p className="flex items-center gap-2">
                      <Languages size={16} />{" "}
                      {lang === "en" ? doctor.lang : doctor.taLang}
                    </p>
                    <p className="flex items-center gap-2">
                      <Video size={16} /> {t.online}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarCheck size={16} />{" "}
                      {lang === "en" ? doctor.time : doctor.taTime}
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl bg-[#E3F1F1] p-4">
                    <p className="text-sm font-semibold text-slate-600">
                      {t.fee}
                    </p>
                    <p className="text-2xl font-bold text-[#0F8B8D]">
                      {doctor.fee}
                    </p>
                  </div>

                  <Link
                    href="/payment"
                    className="mt-5 block rounded-2xl bg-[#FF7A59] py-3 text-center font-bold text-white"
                  >
                    {t.book}
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