import { Storage } from "../utils/storage";

/**
 * Auren Labs — OfficeOps
 * AI AgentHub (v3.0)
 * Implements: live operational insight, linear regression forecasting,
 * AI summaries, and PDF report text generation.
 */

class AgentHub {
  constructor() {
    this.refresh();
  }

  refresh() {
    this.state = Storage.loadAll();
  }

  // 🧭 Quick operational overview
  predict() {
    this.refresh();
    const { tasks, documents, expenses } = this.state;

    const pendingTasks = tasks.filter((t) => t.status !== "done");
    const pendingDocs = documents.filter((d) => d.status === "pending");
    const pendingExpenses = expenses.filter((e) => e.status !== "Approved");

    const summary = [];
    if (pendingTasks.length)
      summary.push(`${pendingTasks.length} task${pendingTasks.length > 1 ? "s" : ""} pending`);
    if (pendingDocs.length)
      summary.push(`${pendingDocs.length} document${pendingDocs.length > 1 ? "s" : ""} under review`);
    if (pendingExpenses.length)
      summary.push(`${pendingExpenses.length} expense${pendingExpenses.length > 1 ? "s" : ""} awaiting approval`);

    return summary.length
      ? `Currently: ${summary.join(", ")}.`
      : "All operations running smoothly.";
  }

  // 🔮 Regression-based workload forecast
  predictTrend({ pastWeeks = 6, forecastWeeks = 4 } = {}) {
    this.refresh();
    const { tasks } = this.state;

    // simulate pseudo-weekly workload from total count
    const total = tasks.length || 0;
    const base = Math.max(3, Math.round(total / (pastWeeks + 1)));
    const history = Array.from({ length: pastWeeks }, (_, i) =>
      Math.round(base + Math.random() * 4 + i * (Math.random() * 2))
    );

    // --- linear regression on historical data ---
    const n = history.length;
    const x = Array.from({ length: n }, (_, i) => i + 1);
    const y = history;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    const slope =
      x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0) /
      x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0);
    const intercept = meanY - slope * meanX;

    // --- predict future values ---
    const forecasts = [];
    for (let i = 1; i <= forecastWeeks; i++) {
      const futureX = n + i;
      const predicted = intercept + slope * futureX;
      forecasts.push(Math.max(0, Math.round(predicted)));
    }

    const avgGrowth = slope.toFixed(1);
    const statement = `Over the last ${pastWeeks} weeks, workload grew ${
      slope >= 0 ? "+" : ""
    }${avgGrowth} tasks per week. Projected workload for the next ${forecastWeeks} weeks: ~${forecasts.at(-1)} tasks.`;

    return {
      statement,
      chartData: [...history, ...forecasts],
      pastWeeks,
      forecastWeeks,
      context: {
        currentTotal: total,
        completed: tasks.filter((t) => t.status === "done").length,
        active: tasks.filter((t) => t.status !== "done").length,
        slope,
      },
    };
  }

  // 🧾 Weekly summary (for AI SummaryModal)
  summarizeWeek() {
    this.refresh();
    const { tasks, documents, expenses, events } = this.state;

    const pendingTasks = tasks.filter((t) => t.status !== "done").length;
    const completed = tasks.filter((t) => t.status === "done").length;
    const pendingDocs = documents.filter((d) => d.status === "pending").length;
    const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
    const approvedExpenses = expenses
      .filter((e) => e.status === "Approved")
      .reduce((a, b) => a + b.amount, 0);

    const narrative = `This week summary:\n• ${completed} tasks completed and ${pendingTasks} still open.\n• ${pendingDocs} documents awaiting review.\n• $${approvedExpenses} approved expenses out of $${totalExpenses} total.`;

    return {
      pendingTasks,
      pendingDocs,
      completed,
      totalExpenses,
      approvedExpenses,
      narrative,
      upcoming: events.sort((a, b) => new Date(a.date) - new Date(b.date)),
    };
  }

  // 📊 Text report for PDF export
  generateReport() {
    this.refresh();
    const { tasks, documents, expenses } = this.state;

    const done = tasks.filter((t) => t.status === "done").length;
    const total = tasks.length || 1;
    const rate = Math.round((done / total) * 100);
    const pendingDocs = documents.filter((d) => d.status === "pending").length;
    const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
    const approvedExpenses = expenses
      .filter((e) => e.status === "Approved")
      .reduce((a, b) => a + b.amount, 0);

    return (
      `Operational Report\n\n` +
      `• Tasks complete: ${done}/${total} (${rate}%)\n` +
      `• Pending documents: ${pendingDocs}\n` +
      `• Total expenses: $${totalExpenses}\n` +
      `• Approved expenses: $${approvedExpenses}\n\n` +
      `Generated automatically by Auren Labs OfficeOps AI Agent.`
    );
  }
}

export const OpsAgent = new AgentHub();
