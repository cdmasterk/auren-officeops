import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; // Assuming this is at ../components/Button

// NOTE: No image imports needed as files are referenced directly from the public folder.

// Feature data for the card grid
const features = [
  {
    name: '🔮 AI-Powered Predictions',
    description: 'Get predictive workload forecasts and automatic weekly summaries from the AI AgentHub.',
  },
  {
    name: '⚙️ Task Automation',
    description: 'Manage and prioritize daily operations with an intelligent orchestrator that suggests next steps.',
  },
  {
    name: '📄 Instant PDF Reporting',
    description: 'Generate client-ready expense summaries or internal operations reports in seconds.',
  },
  {
    name: '💵 Payroll & HR Hub',
    description: 'Streamline employee onboarding, manage documents, and run payroll from one connected module.',
  },
  {
    name: '🗓️ Smart Scheduling',
    description: 'View and manage all office events and deadlines in a clean, Fiori-style calendar grid.',
  },
  {
    name: '🧠 Unified AI Assistant',
    description: 'Ask natural-language questions like, "What\'s our total weekly expense?" and get instant answers.',
  },
];


export default function Landing() {
  const navigate = useNavigate();

  // Helper function to scroll to a section (though not strictly needed since buttons navigate)
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Main container with your original gradient background
    <div className="flex flex-col bg-gradient-to-br from-[#f8fbff] via-[#eef4ff] to-[#dbe9ff] font-sans text-slate-900 antialiased">
      
      {/* --- Header/Navigation --- */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Auren Labs Logo using public path: /images/auren-labs-logo.png */}
              <img 
                src="/images/auren-labs-logo.png" 
                alt="Auren Labs Logo" 
                className="h-8 w-auto" 
              /> 
              <span className="text-xl font-light text-gray-400">|</span>
              <span className="font-semibold text-xl text-auren-navy">OfficeOps</span>
            </div>
            <Button
              onClick={() => navigate('/dashboard')}
              className="hidden sm:inline-flex bg-auren-blue text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:scale-105 transition-transform"
            >
              See OfficeOps Demo
            </Button>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main>
        
        {/* --- 1. Hero Section --- */}
        <section className="relative overflow-hidden bg-white/50 pt-24 pb-20 text-center sm:pt-32 sm:pb-28">
          {/* Glow backdrop from your original file */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#5ea0ff1a,_transparent_70%)]"></div>

          <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tighter text-auren-navy sm:text-6xl drop-shadow-sm">
              Your Daily Operations, Run on Autopilot.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Auren Labs OfficeOps is the intelligent command center for financial and advisory firms.
              Stop juggling tasks and start getting AI-powered clarity on payroll, HR, scheduling, and reporting—all in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <Button
                // Action: Redirect to dashboard for demo
                onClick={() => navigate('/dashboard')}
                className="bg-auren-blue text-white px-6 py-3 rounded-lg text-base font-medium shadow-md hover:scale-105 transition-transform"
              >
                See OfficeOps in Action
              </Button>
              <Button
                onClick={() => navigate('/contact')} // Example: navigates to a contact page
                className="border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg text-base font-medium shadow-sm hover:bg-gray-50 transition-colors"
              >
                Request White-Label Access
              </Button>
            </div>
          </div>

          {/* App Preview Image using public path: /images/officeops-dashboard.jpg */}
          <div id="demo-preview" className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 sm:mt-24">
            <img
              src="/images/officeops-dashboard.jpg" 
              alt="OfficeOps Dashboard showing tasks, expenses, and AI predictions"
              className="w-full rounded-xl border border-gray-200 shadow-2xl"
            />
          </div>
        </section>

        {/* --- 2. How It Works --- */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-3xl font-bold tracking-tight text-auren-navy sm:text-4xl">
                From Chaos to Clarity in One Click
              </h3>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                OfficeOps unifies your disparate systems. From tasks to payroll, everything syncs to a central dashboard, giving you a real-time view of your entire operation without switching tabs.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="text-4xl">🔄</div>
                <h4 className="mt-4 text-xl font-semibold leading-7 text-auren-navy">1. Connect & Unify</h4>
                <p className="mt-2 text-base leading-7 text-gray-600">View all your KPIs in one place.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl">📊</div>
                <h4 className="mt-4 text-xl font-semibold leading-7 text-auren-navy">2. Orchestrate</h4>
                <p className="mt-2 text-base leading-7 text-gray-600">Manage tasks and schedules intelligently.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl">🤖</div>
                <h4 className="mt-4 text-xl font-semibold leading-7 text-auren-navy">3. Automate & Report</h4>
                <p className="mt-2 text-base leading-7 text-gray-600">Let AI handle the summaries and reports.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. Features --- */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-auren-navy sm:text-4xl">
                Your Operations, Beautifully Organized.
              </h2>
            </div>
            {/* Using your existing card style: bg-white/80 backdrop-blur-sm */}
            <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div 
                  key={feature.name} 
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <h4 className="text-lg font-semibold leading-7 text-auren-navy">
                    {feature.name}
                  </h4>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4. Live Insights Section --- */}
        <section className="overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2 lg:gap-x-24">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-auren-navy sm:text-4xl">
                  Go Beyond Data. Get Instant Insights.
                </h3>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Our <strong>AIQuickActions</strong> bar doesn't just show data; it provides answers. Move from static numbers to actionable intelligence. Predict workload trends, summarize your week, or automate expense categorization with a single click.
                </p>
                <ul className="mt-8 space-y-4 text-base text-gray-600">
                  <li className="flex gap-x-3">
                    <span className="flex-shrink-0">✅</span>
                    <span><strong className="font-semibold text-auren-navy">Predict Trends:</strong> See workload spikes before they happen.</span>
                  </li>
                  <li className="flex gap-x-3">
                    <span className="flex-shrink-0">✅</span>
                    <span><strong className="font-semibold text-auren-navy">Summarize Week:</strong> Auto-generate executive summaries.</span>
                  </li>
                  <li className="flex gap-x-3">
                    <span className="flex-shrink-0">✅</span>
                    <span><strong className="font-semibold text-auren-navy">Generate Reports:</strong> Create client-ready PDFs in seconds.</span>
                  </li>
                </ul>
              </div>
              {/* Insights Image using public path: /images/predictive-analytics-ui.jpg */}
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border border-gray-200 bg-white shadow-xl">
                <img
                  src="/images/predictive-analytics-ui.jpg" 
                  alt="AI Graphs and QuickActions user interface" 
                  className="w-full rounded-xl border border-gray-200 shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. Security & Reliability --- */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-5xl">🔐</div>
              <h3 className="mt-6 text-3xl font-bold tracking-tight text-auren-navy sm:text-4xl">
                Enterprise-Grade. White-Label Ready.
              </h3>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                OfficeOps is built for security and flexibility. It runs on your own secure infrastructure, deployable with one click to Vercel and Supabase. You get total data control with a modern, local-first stack, ready to be branded as your own.
              </p>
            </div>
          </div>
        </section>

        {/* --- 6. Call to Action --- */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Using a solid color card for the final CTA for contrast */}
            <div className="relative isolate overflow-hidden rounded-2xl bg-white px-6 py-24 text-center shadow-xl sm:rounded-3xl sm:px-16 border border-gray-200">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-auren-navy sm:text-4xl">
                Stop Managing. Start Automating.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-700">
                See how Auren Labs OfficeOps can bring intelligent clarity and control to your firm. Launch the full, interactive demo instantly.
              </p>
              <div className="mt-10 flex items-center justify-center">
                <Button
                  // Action: Redirect to dashboard for demo
                  onClick={() => navigate('/dashboard')}
                  className="bg-auren-blue text-white px-6 py-3 rounded-lg text-base font-medium shadow-md hover:scale-105 transition-transform"
                >
                  🚀 Launch OfficeOps Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-center text-sm leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} Auren Labs. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-auren-navy">Privacy</a>
              <a href="#" className="hover:text-auren-navy">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}