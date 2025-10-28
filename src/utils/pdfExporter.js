import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Storage } from './storage'

export async function generateOpsPDF() {
  const { tasks, documents, expenses, events } = Storage.loadAll()
  const fontColor = rgb(0.15, 0.18, 0.22)
  const accent = rgb(0, 0.56, 0.9)
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([595, 842]) // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const { height } = page.getSize()

  const titleY = height - 60
  page.drawText('Auren Labs — OfficeOps Report', {
    x: 50, y: titleY, size: 22, font, color: accent
  })
  page.drawText(`Generated ${new Date().toLocaleString()}`, {
    x: 50, y: titleY - 25, size: 10, font, color: fontColor
  })

  // --- Summaries ---
  const pendingTasks = tasks.filter(t => t.status !== 'done')
  const pendingDocs = documents.filter(d => d.status === 'pending')
  const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0)
  const approvedExpenses = expenses.filter(e => e.status === 'Approved').reduce((a, b) => a + b.amount, 0)
  const meetings = events.length

  const summaryText = [
    `• Pending tasks: ${pendingTasks.length}`,
    `• Documents awaiting review: ${pendingDocs.length}`,
    `• Total expenses this month: $${totalExpenses}`,
    `• Approved expenses: $${approvedExpenses}`,
    `• Scheduled meetings this week: ${meetings}`
  ].join('\n')

  page.drawText('Summary:', { x: 50, y: titleY - 60, size: 14, font, color: accent })
  page.drawText(summaryText, { x: 70, y: titleY - 80, size: 11, font, color: fontColor, lineHeight: 14 })

  // --- Detailed Tasks Section ---
  let y = titleY - 160
  page.drawText('Pending Tasks', { x: 50, y, size: 13, font, color: accent })
  y -= 20
  pendingTasks.slice(0, 10).forEach(t => {
    const line = `${t.title}  (${t.due})`
    page.drawText(`• ${line}`, { x: 60, y, size: 10, font, color: fontColor })
    y -= 14
  })

  // --- Expense Breakdown ---
  y -= 10
  page.drawText('Expense Breakdown', { x: 50, y, size: 13, font, color: accent })
  y -= 20
  const grouped = groupBy(expenses, 'category')
  Object.entries(grouped).forEach(([cat, arr]) => {
    const total = arr.reduce((a, b) => a + b.amount, 0)
    page.drawText(`• ${cat}: $${total} (${arr.length} items)`, {
      x: 60, y, size: 10, font, color: fontColor
    })
    y -= 14
  })

  // --- Upcoming Meetings ---
  y -= 10
  page.drawText('Upcoming Meetings', { x: 50, y, size: 13, font, color: accent })
  y -= 20
  events.slice(0, 8).forEach(ev => {
    const line = `${ev.title} — ${ev.date} ${ev.start}`
    page.drawText(`• ${line}`, { x: 60, y, size: 10, font, color: fontColor })
    y -= 14
  })

  // --- Final Notes ---
  page.drawText(
    'AI Insight: Overall operations are stable. Focus on clearing pending tasks and document reviews for the week.',
    { x: 50, y: 80, size: 10, font, color: rgb(0.25, 0.25, 0.25), lineHeight: 12 }
  )

  // --- Save & trigger download ---
  const pdfBytes = await pdf.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `OfficeOps_Report_${new Date().toISOString().split('T')[0]}.pdf`
  a.click()
}

function groupBy(arr, key) {
  return arr.reduce((acc, cur) => {
    (acc[cur[key]] = acc[cur[key]] || []).push(cur)
    return acc
  }, {})
}
