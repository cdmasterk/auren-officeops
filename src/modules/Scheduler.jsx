import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { Storage } from '../utils/storage'

// Weekday names for display
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export default function Scheduler() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const { events } = Storage.loadAll()
    setEvents(events)
  }, [])

  // Sort by date ascending
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))

  // Group by weekday
  const grouped = weekdays.map(day => ({
    day,
    events: sorted.filter(e => new Date(e.date).toLocaleDateString('en-US', { weekday: 'short' }) === day),
  }))

  return (
    <div className="space-y-6">
      <Card title="Weekly Schedule">
        <div className="grid grid-cols-5 gap-4">
          {grouped.map((col, i) => (
            <div key={i} className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-3 py-2 bg-auren-bg border-b text-center text-sm font-medium text-auren-navy">
                {col.day}
              </div>
              <div className="flex-1 p-3 space-y-2 min-h-[200px]">
                {col.events.length > 0 ? (
                  col.events.map(ev => (
                    <div
                      key={ev.id}
                      className="p-2 rounded-lg bg-gradient-to-r from-auren-blue/10 to-auren-blue/20 border border-auren-blue/30 hover:shadow-md transition relative"
                    >
                      <div className="text-sm font-medium text-auren-blue truncate">
                        {ev.title}
                      </div>
                      <div className="text-xs text-muted mt-0.5">
                        {ev.start}–{ev.end}
                      </div>
                      <div className="absolute top-1 right-1 text-[10px] text-gray-400">
                        {ev.attendees?.length}👥
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-400 italic text-center pt-8">
                    No events
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Scheduling Preview (for future) */}
      <Card title="AI Smart Planning Preview">
        <div className="text-sm text-muted">
          The AI Scheduler Agent will soon suggest optimal meeting times and workload balance for the week.
          <br />
          (e.g., “Move Payroll Pre-check earlier to reduce Friday overload.”)
        </div>
      </Card>
    </div>
  )
}
