import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { Storage } from '../utils/storage'

export default function FollowUpAgent() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const { tasks, documents } = Storage.loadAll()
    const pendingTasks = tasks.filter(t => t.status !== 'done')
    const pendingDocs = documents.filter(d => d.status === 'pending')
    setAlerts([
      ...pendingTasks.map(t => ({ type: 'task', msg: `${t.title} pending (due ${t.due})` })),
      ...pendingDocs.map(d => ({ type: 'doc', msg: `Review document: ${d.name}` })),
    ])
  }, [])

  const runAI = () => {
    alert('AI Follow-Up Agent sent reminders to all responsible staff.')
  }

  return (
    <div className="space-y-6">
      <Card title="AI Follow-Up Assistant" action={<Button onClick={runAI}>Send Reminders</Button>}>
        <ul className="text-sm text-muted space-y-2">
          {alerts.map((a, i) => (
            <li key={i}>
              {a.type === 'task' ? '🧩' : '📄'} {a.msg}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
