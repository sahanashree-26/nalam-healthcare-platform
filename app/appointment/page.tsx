"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Bot,
  CheckCircle,
  FileText,
  Mic,
  PhoneCall,
} from "lucide-react";

import PatientNavbar from "../components/PatientNavbar";
import { useApp } from "../context/AppContext";

const tamilQuestions = [
  "வணக்கம். நான் நலம் AI உதவியாளர். உங்களுக்கு என்ன பிரச்சனை உள்ளது?",
  "இந்த பிரச்சனை எத்தனை நாட்களாக உள்ளது?",
  "தலைவலி, இருமல், உடல் வலி அல்லது வாந்தி உள்ளதா?",
  "முன்பு இதற்கு ஏதேனும் மருந்து எடுத்தீர்களா?",
];

const englishQuestions = [
  "Hello. I am Nalam AI assistant. What health problem are you facing?",
  "How many days have you had this problem?",
  "Do you have headache, cough, body pain, or vomiting?",
  "Have you taken any medicine for this before?",
];

export default function AppointmentPage() {
  const { lang, isDark } = useApp();

  const [language, setLanguage] = useState<"Tamil" | "English">(
    lang === "ta" ? "Tamil" : "English"
  );
  const [callStarted, setCallStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [status, setStatus] = useState(
    lang === "ta"
      ? "AI ஆலோசனையை தொடங்க மைக் அழுத்தவும்"
      : "Press mic to start AI consultation"
  );
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [notesGenerated, setNotesGenerated] = useState(false);

  const questions = language === "Tamil" ? tamilQuestions : englishQuestions;

  const t =
    lang === "en"
      ? {
          back: "Back to Consultation Type",
          label: "AI Voice Consultation",
          title: "Talk to Nalam AI like a real consultation call.",
          desc: "Press the mic once. AI will ask questions, listen to answers, generate notes, and send them to the doctor automatically.",
          chooseLanguage: "Choose Language",
          tamilNote: "AI will ask questions in Tamil",
          englishNote: "AI will ask questions in English",
          callCompleted: "AI Call Completed",
          callTitle: "Nalam AI Consultation Call",
          startCall: "Start AI Voice Call",
          callProgress: "Call in progress...",
          aiQuestion: "AI Question",
          of: "of",
          answerCaptured: "Patient Answer Captured",
          transcript: "Call Transcript",
          sentTitle: "Notes Successfully Sent",
          sentDesc:
            "Your AI consultation has been completed successfully. The consultation notes have been sent to the doctor. The doctor will review them and send a prescription.",
          dashboard: "Go to Patient Dashboard",
          generated: "Generated Doctor Notes",
          patient: "Patient",
          doctor: "Doctor",
          chief: "Chief Complaint",
          duration: "Duration",
          symptoms: "Associated Symptoms",
          medicine: "Medicine History",
        }
      : {
          back: "ஆலோசனை வகைக்கு திரும்பு",
          label: "AI குரல் ஆலோசனை",
          title: "உண்மையான ஆலோசனை அழைப்பைப் போல நலம் AI உடன் பேசுங்கள்.",
          desc: "மைக் பொத்தானை ஒரு முறை அழுத்துங்கள். AI கேள்விகள் கேட்டு, பதில்களை கேட்டு, குறிப்புகளை மருத்துவருக்கு அனுப்பும்.",
          chooseLanguage: "மொழியை தேர்வு செய்க",
          tamilNote: "AI தமிழில் கேள்விகள் கேட்கும்",
          englishNote: "AI ஆங்கிலத்தில் கேள்விகள் கேட்கும்",
          callCompleted: "AI அழைப்பு முடிந்தது",
          callTitle: "நலம் AI ஆலோசனை அழைப்பு",
          startCall: "AI குரல் அழைப்பை தொடங்கு",
          callProgress: "அழைப்பு நடைபெறுகிறது...",
          aiQuestion: "AI கேள்வி",
          of: "இல்",
          answerCaptured: "நோயாளர் பதில் பதிவு செய்யப்பட்டது",
          transcript: "அழைப்பு உரை",
          sentTitle: "குறிப்புகள் வெற்றிகரமாக அனுப்பப்பட்டது",
          sentDesc:
            "உங்கள் AI ஆலோசனை வெற்றிகரமாக முடிந்தது. ஆலோசனை குறிப்புகள் மருத்துவருக்கு அனுப்பப்பட்டன. மருத்துவர் அவற்றை பார்த்து மருந்துச்சீட்டை அனுப்புவார்.",
          dashboard: "நோயாளர் டாஷ்போர்டுக்கு செல்ல",
          generated: "மருத்துவருக்கான குறிப்புகள்",
          patient: "நோயாளர்",
          doctor: "மருத்துவர்",
          chief: "முக்கிய பிரச்சனை",
          duration: "கால அளவு",
          symptoms: "தொடர்புடைய அறிகுறிகள்",
          medicine: "மருந்து வரலாறு",
        };

  function speak(text: string, afterSpeak?: () => void) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "Tamil" ? "ta-IN" : "en-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => {
      if (afterSpeak) afterSpeak();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function listenForAnswer(onAnswer: (answer: string) => void) {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition works best in Google Chrome.");
      setStatus(
        language === "Tamil"
          ? "இந்த browser-ல் voice recognition support இல்லை."
          : "Voice recognition not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === "Tamil" ? "ta-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    setStatus(
      language === "Tamil"
        ? "நாங்கள் கேட்கிறோம்... பேசுங்கள்"
        : "Listening... please speak"
    );

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCurrentAnswer(transcript);
      onAnswer(transcript);
    };

    recognition.onerror = () => {
      setStatus(
        language === "Tamil"
          ? "குரல் கேட்கவில்லை. மீண்டும் முயற்சிக்கவும்."
          : "Voice not detected. Please try again."
      );
    };
  }

  function generateAndSendNotes(finalAnswers: string[]) {
    const aiNotes = {
      patientName: "Sahana Shree",
      language,
      doctor: "Dr. Priya Raman",
      specialty: "General Physician",
      appointmentTime: "Today, 6:00 PM",
      summary: {
        chiefComplaint: finalAnswers[0] || "Not provided",
        duration: finalAnswers[1] || "Not provided",
        associatedSymptoms: finalAnswers[2] || "Not provided",
        medicineHistory: finalAnswers[3] || "Not provided",
      },
    };

    localStorage.setItem("nalamAiNotes", JSON.stringify(aiNotes));
    setNotesGenerated(true);
    setStatus(
      language === "Tamil"
        ? "AI குறிப்புகள் மருத்துவருக்கு அனுப்பப்பட்டது."
        : "AI notes sent to doctor."
    );
  }

  function askQuestion(index: number, collectedAnswers: string[]) {
    if (index >= questions.length) {
      const thankYou =
        language === "Tamil"
          ? "நன்றி. உங்கள் பதில்களை வைத்து மருத்துவருக்கான குறிப்புகளை உருவாக்குகிறேன். அழைப்பு முடிந்தது."
          : "Thank you. I am preparing notes for the doctor. The call has ended.";

      setCallEnded(true);
      setStatus(language === "Tamil" ? "அழைப்பு முடிகிறது..." : "Ending call...");

      speak(thankYou, () => {
        generateAndSendNotes(collectedAnswers);
      });

      return;
    }

    const question = questions[index];
    setQuestionIndex(index);
    setCurrentQuestion(question);
    setCurrentAnswer("");
    setStatus(language === "Tamil" ? "AI கேள்வி கேட்கிறது..." : "AI is asking...");

    speak(question, () => {
      listenForAnswer((answer) => {
        const updatedAnswers = [...collectedAnswers, answer];
        setAnswers(updatedAnswers);

        setTimeout(() => {
          askQuestion(index + 1, updatedAnswers);
        }, 800);
      });
    });
  }

  function startAiCall() {
    const currentLanguage = lang === "ta" ? "Tamil" : language;
    setLanguage(currentLanguage);
    setCallStarted(true);
    setCallEnded(false);
    setNotesGenerated(false);
    setAnswers([]);
    setQuestionIndex(0);
    setCurrentAnswer("");
    setCurrentQuestion("");
    askQuestion(0, []);
  }

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-[#071A1C] text-white" : "bg-[#F7FAFA] text-[#0F172A]"
      }`}
    >
      <PatientNavbar />

      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link
          href="/consultation-type"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-[#0F8B8D]"
        >
          <ArrowLeft size={18} />
          {t.back}
        </Link>

        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white md:p-12">
          <p className="font-semibold text-[#FF7A59]">{t.label}</p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            {t.title}
          </h1>

          <p className="mt-5 max-w-2xl text-white/70">{t.desc}</p>
        </section>

        <section
          className={`mt-10 rounded-[2rem] p-8 shadow-xl ring-1 ${
            isDark ? "bg-white/10 ring-white/10" : "bg-white ring-slate-100"
          }`}
        >
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">{t.chooseLanguage}</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <button
                disabled={callStarted && !callEnded}
                onClick={() => setLanguage("Tamil")}
                className={`rounded-3xl p-6 text-left font-bold ${
                  language === "Tamil"
                    ? "bg-[#0F8B8D] text-white"
                    : isDark
                    ? "bg-[#071A1C] text-white/75"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                தமிழ்
                <p className="mt-2 text-sm font-normal opacity-80">
                  {t.tamilNote}
                </p>
              </button>

              <button
                disabled={callStarted && !callEnded}
                onClick={() => setLanguage("English")}
                className={`rounded-3xl p-6 text-left font-bold ${
                  language === "English"
                    ? "bg-[#FF7A59] text-white"
                    : isDark
                    ? "bg-[#071A1C] text-white/75"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                English
                <p className="mt-2 text-sm font-normal opacity-80">
                  {t.englishNote}
                </p>
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#0A2426] p-8 text-center text-white">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
              {callEnded ? (
                <CheckCircle className="text-green-400" size={42} />
              ) : callStarted ? (
                <PhoneCall className="text-[#FF7A59]" size={42} />
              ) : (
                <Mic className="text-[#FF7A59]" size={42} />
              )}
            </div>

            <h3 className="text-2xl font-bold">
              {callEnded ? t.callCompleted : t.callTitle}
            </h3>

            <p className="mt-3 text-white/70">{status}</p>

            {!callStarted || callEnded ? (
              <button
                onClick={startAiCall}
                className="mt-8 rounded-full bg-[#FF7A59] px-8 py-4 font-bold text-white shadow-lg"
              >
                <Mic className="mr-2 inline" size={18} />
                {t.startCall}
              </button>
            ) : (
              <div className="mt-8 rounded-full bg-white/10 px-6 py-4 font-semibold text-[#FFB199]">
                {t.callProgress}
              </div>
            )}
          </div>

          {currentQuestion && (
            <div className="mt-8 rounded-3xl bg-[#E3F1F1] p-6 text-[#0F172A]">
              <div className="mb-4 flex items-center gap-2 text-[#0F8B8D]">
                <Bot />
                <p className="font-bold">
                  {t.aiQuestion} {Math.min(questionIndex + 1, questions.length)}{" "}
                  {t.of} {questions.length}
                </p>
              </div>

              <p className="text-xl font-bold">{currentQuestion}</p>

              {currentAnswer && (
                <div className="mt-5 rounded-2xl bg-white p-4">
                  <p className="text-sm font-semibold text-[#0F8B8D]">
                    {t.answerCaptured}
                  </p>
                  <p className="mt-2 text-slate-700">{currentAnswer}</p>
                </div>
              )}
            </div>
          )}

          {answers.length > 0 && (
            <div
              className={`mt-8 rounded-3xl p-6 ring-1 ${
                isDark ? "bg-[#071A1C] ring-white/10" : "bg-white ring-slate-100"
              }`}
            >
              <h3 className="mb-4 text-xl font-bold">{t.transcript}</h3>

              <div className="space-y-4">
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className={isDark ? "rounded-2xl bg-white/10 p-4" : "rounded-2xl bg-slate-50 p-4"}
                  >
                    <p className="text-sm font-semibold text-[#0F8B8D]">
                      Q{index + 1}: {questions[index]}
                    </p>
                    <p className={isDark ? "mt-2 text-white/75" : "mt-2 text-slate-700"}>
                      A: {answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notesGenerated && (
            <div className="mt-8 rounded-3xl bg-green-100 p-6 text-green-800">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle />
                <h3 className="text-xl font-bold">{t.sentTitle}</h3>
              </div>

              <p>{t.sentDesc}</p>

              <Link
                href="/patient-dashboard"
                className="mt-5 block rounded-2xl bg-[#0F8B8D] py-4 text-center font-bold text-white"
              >
                {t.dashboard}
              </Link>
            </div>
          )}

          {notesGenerated && (
            <div className="mt-8 rounded-3xl bg-[#E3F1F1] p-6 text-[#0F172A]">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#0F8B8D]">
                <FileText />
                {t.generated}
              </h3>

              <div className="space-y-3 text-slate-700">
                <p>
                  <b>{t.patient}:</b> Sahana Shree
                </p>
                <p>
                  <b>Language:</b> {language}
                </p>
                <p>
                  <b>{t.doctor}:</b> Dr. Priya Raman
                </p>
                <p>
                  <b>{t.chief}:</b> {answers[0]}
                </p>
                <p>
                  <b>{t.duration}:</b> {answers[1]}
                </p>
                <p>
                  <b>{t.symptoms}:</b> {answers[2]}
                </p>
                <p>
                  <b>{t.medicine}:</b> {answers[3]}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}