import React from "react";
import Button from "./Button";

export default function SummaryModal({ open, onClose, summary }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal card */}
      <div className="relative z-10 w-[680px] max-w-[92vw] bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-auren-navy">
            Weekly Operations Summary
          </h2>
          <Button onClick={onClose}>✕ Close</Button>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          <div className="p-3 border rounded-xl text-center">
            <div className="text-xs text-muted uppercase">Pending Tasks</div>
            <div className="text-2xl font-bold text-auren-blue">
              {summary.pendingTasks}
            </div>
          </div>
          <div className="p-3 border rounded-xl text-center">
            <div className="text-xs text-muted uppercase">Docs to Review</div>
            <div className="text-2xl font-bold text-auren-orange">
              {summary.pendingDocs}
            </div>
          </div>
          <div className="p-3 border rounded-xl text-center">
            <div className="text-xs text-muted uppercase">Total Expenses</div>
            <div className="text-2xl font-bold text-auren-navy">
              ${summary.totalExpenses}
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-3 bg-auren-bg text-sm whitespace-pre-wrap">
          {summary.narrative}
        </div>

        {summary.upcoming?.length > 0 && (
          <div className="mt-4">
            <div className="font-semibold mb-1 text-auren-navy">
              Upcoming Meetings
            </div>
            <ul className="text-sm list-disc ml-5 space-y-1">
              {summary.upcoming.slice(0, 6).map((ev, i) => (
                <li key={i}>
                  {ev.date} {ev.start} – {ev.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
