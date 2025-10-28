import React from 'react'


export default function StatusPill({status}){
const map = {
'pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
'done': 'bg-emerald-50 text-emerald-700 border-emerald-200'
}
return <span className={`px-2 py-1 rounded-full border text-xs ${map[status] || ''}`}>{status}</span>
}