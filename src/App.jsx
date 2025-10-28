import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./modules/Landing";
import Dashboard from "./modules/Dashboard";
import Tasks from "./modules/Tasks";
import Payroll from "./modules/Payroll";
import HR from "./modules/HR";
import Reports from "./modules/Reports";
import Documents from "./modules/Documents";
import Scheduler from "./modules/Scheduler";
import Expenses from "./modules/Expenses";
import FollowUpAgent from "./modules/FollowUpAgent";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <Routes>
      {/* ✅ Landing standalone (no sidebar) */}
      <Route path="/" element={<Landing />} />

      {/* ✅ Everything else inside MainLayout */}
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/tasks"
        element={
          <MainLayout>
            <Tasks />
          </MainLayout>
        }
      />
      <Route
        path="/payroll"
        element={
          <MainLayout>
            <Payroll />
          </MainLayout>
        }
      />
      <Route
        path="/hr"
        element={
          <MainLayout>
            <HR />
          </MainLayout>
        }
      />
      <Route
        path="/reports"
        element={
          <MainLayout>
            <Reports />
          </MainLayout>
        }
      />
      <Route
        path="/documents"
        element={
          <MainLayout>
            <Documents />
          </MainLayout>
        }
      />
      <Route
        path="/scheduler"
        element={
          <MainLayout>
            <Scheduler />
          </MainLayout>
        }
      />
      <Route
        path="/expenses"
        element={
          <MainLayout>
            <Expenses />
          </MainLayout>
        }
      />
      <Route
        path="/followup"
        element={
          <MainLayout>
            <FollowUpAgent />
          </MainLayout>
        }
      />
    </Routes>
  );
}
