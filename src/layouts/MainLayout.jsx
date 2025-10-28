import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import AIQuickActions from "../components/AIQuickActions";

export default function MainLayout({ children }) {
  return (
    <div
      className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[64px_1fr_auto]"
      style={{ gridTemplateAreas: `"top top" "side main" "ai ai"` }}
    >
      <div style={{ gridArea: "top" }} className="bg-white border-b">
        <Topbar />
      </div>

      <aside style={{ gridArea: "side" }} className="border-r bg-white">
        <Sidebar />
      </aside>

      <main style={{ gridArea: "main" }} className="p-6 space-y-6">
        {children}
      </main>

      <footer style={{ gridArea: "ai" }} className="bg-white border-t">
        <AIQuickActions />
      </footer>
    </div>
  );
}
