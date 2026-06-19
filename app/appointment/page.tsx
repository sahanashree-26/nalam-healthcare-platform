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
  Send,
} from "lucide-react";

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

type Language = "Tamil" | "English";

export default function AppointmentPage() {
  const [language, setLanguage] = useState<Language>("Tamil");
  const [callStarted, setCallStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [status, setStatus] = useState("Press mic to start AI consultation");
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [notesGenerated, setNotesGenerated] = useState(false);

  const questions = language === "Tamil" ? tamilQuestions : englishQuestions;

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
      setStatus("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === "Tamil" ? "ta-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    setStatus(language === "Tamil" ? "நாங்கள் கேட்கிறோம்... பேசுங்கள்" : "Listening... please speak");

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCurrentAnswer(transcript);
      onAnswer(transcript);
    };

    recognition.onerror = () => {
      setStatus(language === "Tamil" ? "குரல் கேட்கவில்லை. மீண்டும் முயற்சிக்கவும்." : "Voice not detected. Please try again.");
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
    <main className="min-h-screen bg-[#F7FAFA] px-6 py-8 text-[#0F172A]">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/hospitals"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-[#0F8B8D]"
        >
          <ArrowLeft size={18} />
          Back to Hospitals
        </Link>

        <section className="rounded-[2rem] bg-[#0A2426] p-8 text-white md:p-12">
          <p className="font-semibold text-[#FF7A59]">
            AI Voice Consultation
          </p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Talk to Nalam AI like a real consultation call.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Press the mic once. AI will ask questions, listen to answers,
            generate notes, and send them to the doctor automatically.
          </p>
        </section>

        <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-100">
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Choose Language</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <button
                disabled={callStarted && !callEnded}
                onClick={() => setLanguage("Tamil")}
                className={`rounded-3xl p-6 text-left font-bold ${
                  language === "Tamil"
                    ? "bg-[#0F8B8D] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                தமிழ்
                <p className="mt-2 text-sm font-normal opacity-80">
                  AI Tamil-la கேள்வி கேட்கும்
                </p>
              </button>

              <button
                disabled={callStarted && !callEnded}
                onClick={() => setLanguage("English")}
                className={`rounded-3xl p-6 text-left font-bold ${
                  language === "English"
                    ? "bg-[#FF7A59] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                English
                <p className="mt-2 text-sm font-normal opacity-80">
                  AI will ask questions in English
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
              {callEnded ? "AI Call Completed" : "Nalam AI Consultation Call"}
            </h3>

            <p className="mt-3 text-white/70">{status}</p>

            {!callStarted || callEnded ? (
              <button
                onClick={startAiCall}
                className="mt-8 rounded-full bg-[#FF7A59] px-8 py-4 font-bold text-white shadow-lg"
              >
                <Mic className="mr-2 inline" size={18} />
                Start AI Voice Call
              </button>
            ) : (
              <div className="mt-8 rounded-full bg-white/10 px-6 py-4 font-semibold text-[#FFB199]">
                Call in progress...
              </div>
            )}
          </div>

          {currentQuestion && (
            <div className="mt-8 rounded-3xl bg-[#E3F1F1] p-6">
              <div className="mb-4 flex items-center gap-2 text-[#0F8B8D]">
                <Bot />
                <p className="font-bold">
                  AI Question {Math.min(questionIndex + 1, questions.length)} of{" "}
                  {questions.length}
                </p>
              </div>
              <p className="text-xl font-bold">{currentQuestion}</p>

              {currentAnswer && (
                <div className="mt-5 rounded-2xl bg-white p-4">
                  <p className="text-sm font-semibold text-[#0F8B8D]">
                    Patient Answer Captured
                  </p>
                  <p className="mt-2 text-slate-700">{currentAnswer}</p>
                </div>
              )}
            </div>
          )}

          {answers.length > 0 && (
            <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-100">
              <h3 className="mb-4 text-xl font-bold">Call Transcript</h3>
              <div className="space-y-4">
                {answers.map((answer, index) => (
                  <div key={index} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-[#0F8B8D]">
                      Q{index + 1}: {questions[index]}
                    </p>
                    <p className="mt-2 text-slate-700">A: {answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notesGenerated && (
            <div className="mt-8 rounded-3xl bg-green-100 p-6 text-green-800">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle />
                <h3 className="text-xl font-bold">
                  Notes Automatically Sent to Doctor
                </h3>
              </div>
              <p>
                The AI consultation call has ended. Patient answers were converted
                into doctor-ready notes and sent to the doctor dashboard.
              </p>

              <Link
                href="/doctor-dashboard"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F8B8D] py-4 font-bold text-white"
              >
                <Send size={18} />
                Open Doctor Dashboard
              </Link>
            </div>
          )}

          {notesGenerated && (
            <div className="mt-8 rounded-3xl bg-[#E3F1F1] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#0F8B8D]">
                <FileText />
                Generated Doctor Notes
              </h3>

              <div className="space-y-3 text-slate-700">
                <p>
                  <b>Patient:</b> Sahana Shree
                </p>
                <p>
                  <b>Language:</b> {language}
                </p>
                <p>
                  <b>Doctor:</b> Dr. Priya Raman
                </p>
                <p>
                  <b>Chief Complaint:</b> {answers[0]}
                </p>
                <p>
                  <b>Duration:</b> {answers[1]}
                </p>
                <p>
                  <b>Associated Symptoms:</b> {answers[2]}
                </p>
                <p>
                  <b>Medicine History:</b> {answers[3]}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}