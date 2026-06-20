"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  Clock,
  Mic,
  MicOff,
  PhoneOff,
  User,
  Video,
} from "lucide-react";

import PatientNavbar from "../components/PatientNavbar";
import { useApp } from "../context/AppContext";

export default function VideoConsultationPage() {
  const { lang, isDark } = useApp();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [joined, setJoined] = useState(false);

  const t =
    lang === "en"
      ? {
          back: "Back to Consultation Type",
          label: "Video Consultation",
          title: "Doctor video consultation appointment",
          desc: "Turn on your camera and microphone to attend the consultation.",
          details: "Appointment Details",
          patient: "Patient",
          doctor: "Doctor",
          time: "Time",
          doctorCamera: "Doctor Camera",
          patientCamera: "Patient Camera",
          doctorName: "Dr. Priya Raman",
          patientName: "Sahana Shree",
          appointmentTime: "Today, 6:00 PM",
          cameraOn: "Camera ON",
          cameraOff: "Camera OFF",
          micOn: "Mic ON",
          micOff: "Mic OFF",
          turnCamera: "Turn On Camera",
          turnMic: "Turn On Mic",
          endCall: "End Call",
          callStatus: "Waiting to join securely",
          connected: "Connected securely",
          joinCall: "Join Video Consultation",
          permissionError: "Please allow camera and microphone permission.",
        }
      : {
          back: "ஆலோசனை வகைக்கு திரும்பு",
          label: "வீடியோ ஆலோசனை",
          title: "மருத்துவருடன் வீடியோ ஆலோசனை அப்பாயின்மெண்ட்",
          desc: "ஆலோசனையில் கலந்து கொள்ள கேமரா மற்றும் மைக்ரோஃபோனை இயக்கவும்.",
          details: "அப்பாயின்மெண்ட் விவரங்கள்",
          patient: "நோயாளர்",
          doctor: "மருத்துவர்",
          time: "நேரம்",
          doctorCamera: "மருத்துவர் கேமரா",
          patientCamera: "நோயாளர் கேமரா",
          doctorName: "டாக்டர் பிரியா ராமன்",
          patientName: "சஹானா ஷ்ரீ",
          appointmentTime: "இன்று, மாலை 6:00",
          cameraOn: "கேமரா இயக்கத்தில்",
          cameraOff: "கேமரா அணைக்கப்பட்டது",
          micOn: "மைக் இயக்கத்தில்",
          micOff: "மைக் அணைக்கப்பட்டது",
          turnCamera: "கேமரா இயக்கு",
          turnMic: "மைக் இயக்கு",
          endCall: "அழைப்பை முடி",
          callStatus: "பாதுகாப்பாக இணைய காத்திருக்கிறது",
          connected: "பாதுகாப்பாக இணைக்கப்பட்டது",
          joinCall: "வீடியோ ஆலோசனையில் சேர",
          permissionError: "கேமரா மற்றும் மைக் அனுமதி வழங்கவும்.",
        };

  async function startMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraOn(true);
      setMicOn(true);
      setJoined(true);
    } catch (error) {
      alert(t.permissionError);
    }
  }

  function toggleCamera() {
    if (!streamRef.current) {
      startMedia();
      return;
    }

    const videoTrack = streamRef.current.getVideoTracks()[0];

    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setCameraOn(videoTrack.enabled);
    }
  }

  function toggleMic() {
    if (!streamRef.current) {
      startMedia();
      return;
    }

    const audioTrack = streamRef.current.getAudioTracks()[0];

    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  }

  function endCall() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    streamRef.current = null;
    setCameraOn(false);
    setMicOn(false);
    setJoined(false);
    window.location.href = "/patient-dashboard";
  }

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-[#071A1C] text-white" : "bg-[#F7FAFA] text-[#0F172A]"
      }`}
    >
      <PatientNavbar />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/consultation-type"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#0F8B8D] shadow-md"
        >
          <ArrowLeft size={18} />
          {t.back}
        </Link>

        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white">
          <p className="font-bold text-[#FF7A59]">{t.label}</p>

          <h1 className="mt-3 text-4xl font-black">{t.title}</h1>

          <p className="mt-4 text-white/70">{t.desc}</p>
        </section>

        <section
          className={`mt-10 rounded-[2rem] p-6 shadow-xl ${
            isDark ? "bg-white/10" : "bg-white"
          }`}
        >
          <div className="mb-6 rounded-3xl bg-[#E3F1F1] p-5 text-[#0F172A]">
            <p className="font-bold text-[#0A2426]">{t.details}</p>

            <div className="mt-3 grid gap-3 text-slate-700 md:grid-cols-3">
              <p>
                <b>{t.patient}:</b> {t.patientName}
              </p>
              <p>
                <b>{t.doctor}:</b> {t.doctorName}
              </p>
              <p>
                <b>{t.time}:</b> {t.appointmentTime}
              </p>
            </div>
          </div>

          <div
            className={`mb-6 flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold ${
              joined
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            <Clock size={18} />
            {joined ? t.connected : t.callStatus}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex min-h-72 flex-col items-center justify-center rounded-[2rem] bg-[#0A2426] p-8 text-white">
              <Video size={52} className="text-[#FF7A59]" />

              <h2 className="mt-4 text-2xl font-bold">{t.doctorCamera}</h2>

              <p className="mt-2 text-white/70">{t.doctorName}</p>

              <span className="mt-4 rounded-full bg-green-500 px-4 py-2 text-sm font-bold">
                {joined ? t.connected : t.callStatus}
              </span>
            </div>

            <div
              className={`relative flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-[2rem] p-8 ${
                isDark ? "bg-[#071A1C] text-white" : "bg-slate-100 text-[#0F172A]"
              }`}
            >
              {cameraOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <User size={52} className="text-[#0F8B8D]" />
                  <h2 className="mt-4 text-2xl font-bold">{t.patientCamera}</h2>
                  <p
                    className={
                      isDark ? "mt-2 text-white/70" : "mt-2 text-slate-600"
                    }
                  >
                    {t.patientName}
                  </p>
                </div>
              )}

              <div className="absolute bottom-4 left-4 flex gap-2">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold text-white ${
                    cameraOn ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {cameraOn ? t.cameraOn : t.cameraOff}
                </span>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold text-white ${
                    micOn ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {micOn ? t.micOn : t.micOff}
                </span>
              </div>
            </div>
          </div>

          {!joined && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={startMedia}
                className="rounded-full bg-[#FF7A59] px-8 py-4 font-bold text-white shadow-lg"
              >
                {t.joinCall}
              </button>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={toggleCamera}
              className={`flex items-center gap-2 rounded-full px-6 py-4 font-bold text-white ${
                cameraOn ? "bg-green-600" : "bg-[#0F8B8D]"
              }`}
            >
              {cameraOn ? <Camera size={18} /> : <CameraOff size={18} />}
              {cameraOn ? t.cameraOn : t.turnCamera}
            </button>

            <button
              onClick={toggleMic}
              className={`flex items-center gap-2 rounded-full px-6 py-4 font-bold text-white ${
                micOn ? "bg-green-600" : "bg-[#0F8B8D]"
              }`}
            >
              {micOn ? <Mic size={18} /> : <MicOff size={18} />}
              {micOn ? t.micOn : t.turnMic}
            </button>

            <button
              onClick={endCall}
              className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-4 font-bold text-white"
            >
              <PhoneOff size={18} />
              {t.endCall}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}