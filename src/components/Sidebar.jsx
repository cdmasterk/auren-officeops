import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-between px-4 py-3 border-b hover:bg-auren-bg ${
        isActive ? 'bg-auren-bg font-semibold' : ''
      }`
    }
  >
    <span>{label}</span>
    <span className="text-muted">›</span>
  </NavLink>
)

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 text-sm text-muted">Navigation</div>
      <LinkItem to="/" label="Dashboard" />
      <LinkItem to="/tasks" label="Tasks" />
      <LinkItem to="/payroll" label="Payroll" />
      <LinkItem to="/hr" label="HR & Onboarding" />
      <LinkItem to="/documents" label="Documents" />
      <LinkItem to="/scheduler" label="Scheduler" />
      <LinkItem to="/expenses" label="Expenses" />
      <LinkItem to="/followup" label="Follow-Up Assistant" />
      <LinkItem to="/reports" label="Reports" />
    </div>
  )
}
