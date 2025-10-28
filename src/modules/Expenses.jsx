import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { Storage } from '../utils/storage'

export default function Expenses() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    const { expenses } = Storage.loadAll()
    setExpenses(expenses)
  }, [])

  const approve = id => {
    const updated = expenses.map(e =>
      e.id === id ? { ...e, status: 'Approved' } : e
    )
    setExpenses(updated)
    Storage.set('expenses', updated)
  }

  return (
    <div className="space-y-6">
      <Card title="Expense Overview">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-muted">
            <tr>
              <th className="py-2">Category</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(e => (
              <tr key={e.id} className="border-b hover:bg-auren-bg">
                <td className="py-2">{e.category}</td>
                <td>{e.vendor}</td>
                <td>${e.amount}</td>
                <td>{e.status}</td>
                <td>{e.date}</td>
                <td>
                  {e.status !== 'Approved' && (
                    <Button size="sm" onClick={() => approve(e.id)}>
                      Approve
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
