import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { Storage } from '../utils/storage'

export default function Tasks() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const { tasks } = Storage.loadAll()
    setTasks(tasks)
  }, [])

  const toggleStatus = id => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t
    )
    setTasks(updated)
    Storage.set('tasks', updated)
  }

  const addTask = () => {
    const title = prompt('Enter new task title:')
    if (!title) return
    const newTask = {
      id: Date.now(),
      title,
      status: 'pending',
      due: new Date().toISOString().split('T')[0],
      owner: 'Rachel Elam',
      tags: ['manual'],
    }
    const updated = [...tasks, newTask]
    setTasks(updated)
    Storage.set('tasks', updated)
  }

  return (
    <div className="space-y-6">
      <Card title="Task Orchestrator" action={<Button onClick={addTask}>Add Task</Button>}>
        <table className="w-full text-sm">
          <thead className="border-b text-left text-muted">
            <tr>
              <th className="py-2">Title</th>
              <th>Status</th>
              <th>Due</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id} className="border-b hover:bg-auren-bg">
                <td className="py-2">{t.title}</td>
                <td>{t.status}</td>
                <td>{t.due}</td>
                <td>{t.owner}</td>
                <td>
                  <Button
                    size="sm"
                    variant={t.status === 'done' ? 'secondary' : 'primary'}
                    onClick={() => toggleStatus(t.id)}
                  >
                    {t.status === 'done' ? 'Undo' : 'Mark Done'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
