import React, { useState } from "react";
import Button from "./Button";
import Toast from "./Toast";
import PredictModal from "./PredictModal";
import SummaryModal from "./SummaryModal";
import { OpsAgent } from "../ai/AgentHub";
import { generateOpsPDF } from "../utils/pdfExporter";

export default function AIQuickActions() {
  const [status, setStatus] = useState("AI Agent ready");
  const [toast, setToast] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [predictOpen, setPredictOpen] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleAction = async (label) => {
    let result = "";

    switch (label) {
      case "Predict":
        setPredictOpen(true);
        result = OpsAgent.predict();
        showToast("AI Prediction Generated");
        break;

      case "Automate":
        result =
          "Automation executed — payroll reminders and HR syncs created.";
        showToast("Automation Complete");
        break;

      case "Generate Report":
        showToast("Generating live data report...");
        await generateOpsPDF();
        result = "AI Report Generated";
        showToast("PDF Report Generated");
        break;

      case "Summarize Week": {
        const summary = OpsAgent.summarizeWeek();
        setSummaryData(summary);
        setSummaryOpen(true);
        result = "Weekly summary ready";
        showToast("AI Weekly Summary Ready");
        break;
      }

      default:
        result = "Unknown command.";
    }

    setStatus(result);
  };

  return (
    <>
      {/* toolbar */}
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3 justify-between border-t border-gray-200 bg-white">
        <div className="flex gap-3 flex-wrap">
          <Button
            className="border border-gray-300 text-gray-700 hover:bg-auren-bg"
            onClick={() => handleAction("Predict")}
          >
            🔮 Predict
          </Button>

          <Button
            className="border border-gray-300 text-gray-700 hover:bg-auren-bg"
            onClick={() => handleAction("Automate")}
          >
            ⚙️ Automate
          </Button>

          <Button
            className="border border-gray-300 text-gray-700 hover:bg-auren-bg"
            onClick={() => handleAction("Generate Report")}
          >
            📊 Generate Report
          </Button>

          <Button
            className="border border-gray-300 text-gray-700 hover:bg-auren-bg"
            onClick={() => handleAction("Summarize Week")}
          >
            🧠 Summarize Week
          </Button>
        </div>

        <div className="text-sm text-muted truncate w-full sm:w-auto text-right mt-2 sm:mt-0">
          {status}
        </div>
      </div>

      {/* toast */}
      <Toast message={toast} onClose={() => setToast("")} />

      {/* modals */}
      <PredictModal open={predictOpen} onClose={() => setPredictOpen(false)} />
      <SummaryModal
        open={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        summary={
          summaryData || {
            pendingTasks: 0,
            pendingDocs: 0,
            totalExpenses: 0,
            narrative: "No data",
            upcoming: [],
          }
        }
      />
    </>
  );
}
