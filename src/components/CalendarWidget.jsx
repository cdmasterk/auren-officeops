import React from 'react'
export default function CalendarWidget() {
  return (
    <div className="grid grid-cols-7 gap-2 text-sm">
      {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i)=>(
        <div key={i} className="p-3 border rounded-xl text-center bg-white">
          <div className="font-medium">{d}</div>
          <div className="text-xs text-muted">No events</div>
        </div>
      ))}
    </div>
  )
}
