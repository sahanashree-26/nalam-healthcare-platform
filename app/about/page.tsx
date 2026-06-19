import { HeartPulse, Hospital, Languages, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7FAFA] px-6 py-10">
      <div className="mx-auto max-w-7xl">

        <section className="rounded-[2rem] bg-[#0A2426] p-10 text-white">
          <p className="font-semibold text-[#FF7A59]">About Nalam</p>

          <h1 className="mt-3 text-5xl font-extrabold">
            Rural Healthcare, Reimagined.
          </h1>

          <p className="mt-5 max-w-3xl text-white/70">
            Nalam connects patients, hospitals and doctors through AI-powered
            healthcare consultations in Tamil and English.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <Hospital className="text-[#0F8B8D]" />
            <h3 className="mt-4 text-xl font-bold">
              Hospital Access
            </h3>
            <p className="mt-2 text-slate-600">
              Discover nearby hospitals instantly.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <Languages className="text-[#FF7A59]" />
            <h3 className="mt-4 text-xl font-bold">
              Multilingual
            </h3>
            <p className="mt-2 text-slate-600">
              Tamil and English healthcare support.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <HeartPulse className="text-red-500" />
            <h3 className="mt-4 text-xl font-bold">
              AI Consultation
            </h3>
            <p className="mt-2 text-slate-600">
              AI captures symptoms and prepares notes.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <ShieldCheck className="text-green-600" />
            <h3 className="mt-4 text-xl font-bold">
              Secure Records
            </h3>
            <p className="mt-2 text-slate-600">
              Digital prescriptions and patient history.
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}