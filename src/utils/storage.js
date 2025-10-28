/**
 * Auren Labs — Unified Local Storage Layer (Final Stable)
 * - Namespaced keys (auren_*)
 * - One-time rich demo seed (only if storage is empty)
 * - No reseeding on subsequent loads
 * - Full CRUD helpers
 */

const PREFIX = "auren_";

/* ---------- helpers ---------- */
const today = new Date();
const iso = (d) => d.toISOString().split("T")[0];
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(today.getDate() - n);
  return iso(d);
};
const daysFromNow = (n) => {
  const d = new Date();
  d.setDate(today.getDate() + n);
  return iso(d);
};

const staff = ["Rachel Elam", "Larry Botts", "Jane Miller", "Tom Chen", "Alex Reed"];

const T = (id, title, status, due, owner = staff[0], tags = []) => ({
  id, title, status, due, owner, tags,
});
const D = (id, name, client, status, date = daysAgo(0), type = "pdf") => ({
  id, name, client, status, date, type,
});
const E = (id, category, amount, note, date, status = "Pending", vendor = "Internal") => ({
  id, category, amount, note, date, status, vendor,
});
const EV = (id, title, dayOffset, start = "10:00", end = "10:45", who = [staff[0]]) => ({
  id, title, date: daysFromNow(dayOffset), start, end, attendees: who,
});

/* ---------- rich demo data (only for first ever run) ---------- */
const defaultTasks = [
  T(1, "Prepare payroll for last month", "done", daysAgo(28), staff[0], ["payroll"]),
  T(2, "Verify W-2 forms batch #12", "done", daysAgo(26), staff[3], ["docs"]),
  T(3, "Reconcile QuickBooks – cards & cash", "done", daysAgo(21), staff[0], ["finance"]),
  T(4, "Archive closed client files (Q2)", "done", daysAgo(19), staff[3], ["ops"]),
  T(5, "Schedule annual vendor review", "done", daysAgo(18), staff[2], ["vendors"]),
  T(6, "Client onboarding – Jane Miller", "in-progress", daysAgo(12), staff[2], ["onboarding"]),
  T(7, "Collect intern timesheets", "pending", daysAgo(10), staff[3], ["payroll"]),
  T(8, "Office supplies reorder (paper/toner)", "pending", daysAgo(9), staff[0], ["inventory"]),
  T(9, "Vendor NDA – Botts Advisors signature", "pending", daysAgo(7), staff[4], ["legal"]),
  T(10, "Prep monthly ops report draft", "in-progress", daysAgo(5), staff[0], ["report"]),
  T(11, "Finalize payroll pre-check", "pending", daysAgo(2), staff[0], ["payroll"]),
  T(12, "Book Larry’s 1:1s for next week", "pending", daysAgo(1), staff[0], ["calendar"]),
  T(13, "Team standup agenda (Mon)", "pending", daysFromNow(0), staff[0], ["ops"]),
  T(14, "Client intake – K. Summers docs review", "pending", daysFromNow(1), staff[3], ["docs"]),
  T(15, "Software renewals quick audit", "pending", daysFromNow(2), staff[0], ["vendors"]),
  T(16, "Prepare next payroll", "pending", daysFromNow(5), staff[0], ["payroll"]),
  T(17, "Publish office newsletter", "pending", daysFromNow(6), staff[2], ["comms"]),
  T(18, "Onboarding – Alex Reed hardware pickup", "pending", daysFromNow(7), staff[4], ["onboarding"]),
  T(19, "Client follow-ups batch send", "pending", daysFromNow(8), staff[3], ["comms"]),
  T(20, "Quarterly expense audit prep", "pending", daysFromNow(10), staff[0], ["finance"]),
  T(21, "Room booking policy refresh", "pending", daysFromNow(12), staff[0], ["ops"]),
  T(22, "CRM hygiene pass (duplicates)", "pending", daysFromNow(13), staff[3], ["crm"]),
  T(23, "Annual leave calendar update", "pending", daysFromNow(14), staff[0], ["hr"]),
  T(24, "Create client welcome kit (print)", "pending", daysFromNow(15), staff[2], ["onboarding"]),
];

const defaultDocuments = [
  D("d1", "W-2 — J. Miller", "Jane Miller", "reviewed", daysAgo(22)),
  D("d2", "Onboarding Form — A. Reed", "Alex Reed", "pending", daysAgo(6)),
  D("d3", "Payroll Report — March", "Internal", "reviewed", daysAgo(25)),
  D("d4", "Vendor NDA — Botts Advisors", "Larry E. Botts", "pending", daysAgo(7)),
  D("d5", "Client Checklist — K. Summers", "K. Summers", "pending", daysAgo(1)),
  D("d6", "1099 Packet — Contractors Q1", "Internal", "reviewed", daysAgo(18)),
  D("d7", "Policy Update — Remote Work", "Internal", "reviewed", daysAgo(9)),
  D("d8", "Expenses Scans — Apr Week 2", "Internal", "pending", daysAgo(4), "images"),
  D("d9", "Advisor License Proof — J. Miller", "Jane Miller", "reviewed", daysAgo(14)),
  D("d10", "Client Intake — R. Patel", "R. Patel", "pending", daysAgo(2)),
  D("d11", "Payroll Exception Notes — Apr", "Internal", "pending", daysAgo(3)),
  D("d12", "Bank Reconciliation Sheet", "Internal", "reviewed", daysAgo(20)),
];

const cats = ["Supplies", "Meals", "Software", "Maintenance", "Travel", "Training"];
const defaultExpenses = Array.from({ length: 24 }).map((_, i) => {
  const c = cats[i % cats.length];
  const amt = Math.floor(35 + Math.random() * 265);
  const note = `${c} item #${i + 1}`;
  const when = i < 12 ? daysAgo(2 * i) : daysFromNow(i - 12);
  const status = Math.random() > 0.55 ? "Approved" : "Pending";
  const vendor = ["Staples", "Local Deli", "SaaS Co.", "Tech Repair", "Uber", "Coursera"][i % 6];
  return E(`e${i + 1}`, c, amt, note, when, status, vendor);
});

const defaultEvents = [
  EV("ev1", "Daily standup", 0, "09:15", "09:30", [staff[0], staff[2], staff[3]]),
  EV("ev2", "Payroll pre-check", 1, "14:00", "14:45", [staff[0]]),
  EV("ev3", "Larry 1:1", 2, "11:00", "11:30", [staff[0], staff[1]]),
  EV("ev4", "Client onboarding — J. M.", 2, "15:00", "15:45", [staff[2], staff[3]]),
  EV("ev5", "Vendors quick audit", 3, "10:00", "10:30", [staff[0]]),
  EV("ev6", "Team retro", 4, "16:00", "17:00", [staff[0], staff[2], staff[3], staff[4]]),
  EV("ev7", "Office newsletter review", 5, "13:00", "13:30", [staff[2]]),
  EV("ev8", "Client follow-up block", 6, "10:30", "11:30", [staff[3]]),
  EV("ev9", "CRM hygiene pass", 8, "09:30", "10:15", [staff[3]]),
  EV("ev10", "Quarterly expense prep", 10, "14:30", "15:30", [staff[0]]),
];

const defaultData = {
  tasks: defaultTasks,
  documents: defaultDocuments,
  expenses: defaultExpenses,
  events: defaultEvents,
};

/* ---------- Storage API ---------- */
export const Storage = {
  get(key, fallback = []) {
    try {
      const val = JSON.parse(localStorage.getItem(PREFIX + key));
      return val ?? fallback;
    } catch {
      return fallback;
    }
  },

  set(key, data) {
    localStorage.setItem(PREFIX + key, JSON.stringify(data));
  },

  loadAll() {
    // seed only if this is truly the first run (no auren_* keys at all)
    const hasAnyAurenKey = Object.keys(localStorage).some((k) => k.startsWith(PREFIX));
    if (!hasAnyAurenKey) {
      localStorage.setItem(PREFIX + "tasks", JSON.stringify(defaultData.tasks));
      localStorage.setItem(PREFIX + "documents", JSON.stringify(defaultData.documents));
      localStorage.setItem(PREFIX + "expenses", JSON.stringify(defaultData.expenses));
      localStorage.setItem(PREFIX + "events", JSON.stringify(defaultData.events));
    }

    return {
      tasks: this.get("tasks"),
      documents: this.get("documents"),
      expenses: this.get("expenses"),
      events: this.get("events"),
    };
  },

  // Convenience CRUDs (used by modules)
  push(entity, item) {
    const list = this.get(entity);
    list.push(item);
    this.set(entity, list);
    return list;
  },

  updateById(entity, id, patch) {
    const list = this.get(entity).map((it) => (it.id === id ? { ...it, ...patch } : it));
    this.set(entity, list);
    return list;
  },

  removeById(entity, id) {
    const list = this.get(entity).filter((it) => it.id !== id);
    this.set(entity, list);
    return list;
  },

  clearAll() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};
