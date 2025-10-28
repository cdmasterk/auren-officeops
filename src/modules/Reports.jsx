import React, {useState} from 'react'
import Card from '../components/Card'
import Button from '../components/Button'


export default function Reports(){
const [content, setContent] = useState('Click Generate to create Weekly Ops Digest.')
const generate = () => setContent(`Weekly Ops Digest\n- Tasks done: 32\n- Overdue: 2\n- Payroll: On track\n- Onboarding: 60% complete\n\nNarrative: Office efficiency at 92%. Payroll expected to close 1 day earlier than average.`)


return (
<div className="space-y-6">
<Card title="AI Report Builder" action={<Button onClick={generate} variant="primary">Generate</Button>}>
<pre className="whitespace-pre-wrap text-sm p-3 border rounded-xl bg-auren-bg">{content}</pre>
</Card>


<Card title="Exports" action={<Button>Download PDF</Button>}>
<div className="text-sm text-muted">PDF export mocked — wire to real export later.</div>
</Card>
</div>
)
}