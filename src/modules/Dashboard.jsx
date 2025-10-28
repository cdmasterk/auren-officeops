import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import ChartWidget from '../widgets/ChartWidget'
import AIChat from '../components/AIChat'
import AIActivityIndicator from '../components/AIActivityIndicator'
import { Storage } from '../utils/storage'
import { OpsAgent } from '../ai/AgentHub'
import { generateOpsPDF } from '../utils/pdfExporter'

export default function Dashboard() {
  const [stats, setStats] = useState({ tasks: 0, docs: 0, expenses: 0, aiMsg: '' })
  const [agentActive, setAgentActive] = useState(false)

  const refresh = () => {
    // activate neural indicator
    setAgentActive(true)

    const data = Storage.loadAll()
    setStats({
      tasks: data.tasks.filter(t => t.status !== 'done').length,
      docs: data.documents.filter(d => d.status === 'pending').length,
      expenses: data.expenses.reduce((a, b) => a + b.amount, 0),
      aiMsg: OpsAgent.predict(),
    })
  }

  const handlePDF = async () => {
    setAgentActive(true)
    await generateOpsPDF(
      `Weekly OfficeOps Report:\n${OpsAgent.generateReport()}\n${OpsAgent.summarizeWeek()}`
    )
  }

  useEffect(() => {
    refresh()
    const timer = setInterval(refresh, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT SIDE — main KPIs and chart */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card p-4 text-center">
              <div className="card-title">Pending Tasks</div>
              <div className="text-3xl font-bold text-auren-blue">{stats.tasks}</div>
            </div>
            <div className="card p-4 text-center">
              <div className="card-title">Docs to Review</div>
              <div className="text-3xl font-bold text-auren-orange">{stats.docs}</div>
            </div>
            <div className="card p-4 text-center">
              <div className="card-title">Weekly Expenses</div>
              <div className="text-3xl font-bold text-auren-navy">${stats.expenses}</div>
            </div>
          </div>

          {/* CHART SECTION */}
          <ChartWidget
            title="Task Velocity (Last 7 Days)"
            data={[8, 12, 10, 15, 17, 16, 22]}
          />
        </div>

        {/* RIGHT SIDE — AI and chat */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card title="AI Prediction">
            <div className="text-sm text-muted min-h-[60px]">{stats.aiMsg}</div>
            <div className="flex gap-3 mt-3">
              <Button variant="primary" onClick={refresh}>
                Refresh
              </Button>
              <Button onClick={handlePDF}>Export PDF</Button>
            </div>
          </Card>

          <AIChat />
        </div>
      </div>

      {/* NEURAL AI ACTIVITY INDICATOR */}
      <AIActivityIndicator isActive={agentActive} />
    </>
  )
}
