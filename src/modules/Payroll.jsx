import React, {useState} from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { payrollQueue } from '../data/demo'


export default function Payroll(){
const [rows, setRows] = useState(payrollQueue)


const approve = (id) => setRows(prev => prev.map(r => r.id===id ? ({...r, status:'Approved'}) : r))
const remind = (id) => alert('Reminder sent to Larry for approval')


return (
<div className="space-y-6">
<Card title="Payroll Queue (AI Pre-check)" action={<Button>Export CSV</Button>}>
<div className="overflow-x-auto">
<table className="min-w-full text-sm">
<thead>
<tr className="border-b">
<th className="text-left py-2">Employee</th>
<th className="text-left">Week</th>
<th className="text-left">Status</th>
<th className="text-left">Anomalies</th>
<th></th>
</tr>
</thead>
<tbody>
{rows.map(r=> (
<tr key={r.id} className="border-b">
<td className="py-2">{r.employee}</td>
<td>{r.week}</td>
<td>{r.status}</td>
<td>{r.anomalies.length ? r.anomalies.join(', ') : '—'}</td>
<td className="text-right">
<div className="flex gap-2 justify-end">
<Button onClick={()=>remind(r.id)}>Remind</Button>
<Button variant="primary" onClick={()=>approve(r.id)}>Approve</Button>
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
</Card>


<Card title="AI Suggestions" action={<Button>Apply all</Button>}>
<ul className="space-y-2">
<li className="p-2 border rounded-xl">Flag overtime outlier (Jane +6h). Propose note and approve?</li>
<li className="p-2 border rounded-xl">Auto-create next week\'s payroll checklist.</li>
</ul>
</Card>
</div>
)
}