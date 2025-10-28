import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fbff] via-[#eef4ff] to-[#dbe9ff] text-center overflow-hidden">
      {/* glow backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#5ea0ff1a,_transparent_70%)] animate-pulse"></div>

      <div className="relative z-10 max-w-3xl px-8">
        {/* Hero */}
        <h1 className="text-5xl font-extrabold text-auren-navy drop-shadow-sm mb-5">
          Run your office without the chaos.
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          OfficeOps organizes your payroll, tasks, and documents automatically —  
          so your team never misses a deadline, a payment, or an onboarding again.
        </p>

        <Button
          onClick={() => navigate("/dashboard")}
          className="border border-gray-300 bg-auren-blue text-white px-8 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition-transform shadow-md"
        >
          🚀 See It in Action
        </Button>

        {/* Highlights */}
        <div className="mt-16 grid sm:grid-cols-3 gap-5 text-left">
          <Feature
            title="✅ Everything Organized"
            text="Track all tasks, payroll items, and documents in one simple view. No spreadsheets. No emails lost."
          />
          <Feature
            title="🧾 Automatic Reports"
            text="Instant weekly summaries for management — who’s done what, what’s overdue, and where money goes."
          />
          <Feature
            title="🔐 Secure & Private"
            text="Each company’s data is isolated and encrypted. You decide who can see payroll or HR data."
          />
        </div>
      </div>

      <footer className="absolute bottom-6 text-xs text-gray-400">
        © {new Date().getFullYear()} Auren Labs — OfficeOps
      </footer>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div className="p-5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition">
      <h3 className="font-semibold text-auren-navy mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}
