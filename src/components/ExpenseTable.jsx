import React from 'react'
export default function ExpenseTable({data}) {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Category</th>
          <th className="text-left">Amount</th>
          <th className="text-left">Note</th>
          <th className="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(e=>(
          <tr key={e.id} className="border-b">
            <td className="py-2">{e.category}</td>
            <td>${e.amount}</td>
            <td>{e.note}</td>
            <td>{e.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
