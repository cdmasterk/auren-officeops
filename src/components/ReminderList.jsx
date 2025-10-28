import React from 'react'
export default function ReminderList({alerts}) {
  return (
    <ul className="space-y-2">
      {alerts.map((a,i)=>(
        <li key={i} className="p-2 border rounded-xl bg-white text-sm">
          <span className="font-medium capitalize">{a.type}:</span> {a.msg}
        </li>
      ))}
    </ul>
  )
}
