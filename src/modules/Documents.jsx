import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import { Storage } from '../utils/storage'

export default function Documents() {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const { documents } = Storage.loadAll()
    setDocs(documents)
  }, [])

  const toggleReview = id => {
    const updated = docs.map(d =>
      d.id === id ? { ...d, status: d.status === 'pending' ? 'reviewed' : 'pending' } : d
    )
    setDocs(updated)
    Storage.set('documents', updated)
  }

  return (
    <div className="space-y-6">
      <Card title="Document Tracker">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-muted">
            <tr>
              <th className="py-2">Name</th>
              <th>Client</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {docs.map(d => (
              <tr key={d.id} className="border-b hover:bg-auren-bg">
                <td className="py-2">{d.name}</td>
                <td>{d.client}</td>
                <td>{d.status}</td>
                <td>{d.date}</td>
                <td>
                  <button
                    onClick={() => toggleReview(d.id)}
                    className="text-auren-blue hover:underline"
                  >
                    {d.status === 'pending' ? 'Mark Reviewed' : 'Reopen'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
