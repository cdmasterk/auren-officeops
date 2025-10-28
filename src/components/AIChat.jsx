import React, {useState} from 'react'
import Button from './Button'


export default function AIChat(){
const [messages, setMessages] = useState([
{ role:'system', text:'I am OpsAgent. Ask me about tasks, payroll, or onboarding.' }
])
const [input, setInput] = useState('Summarize today\'s priorities for Rachel')


const send = () => {
const reply = 'Today: 1) Payroll pre-check, 2) Collect W-2 from J. Miller, 3) Draft Larry\'s ops report.'
setMessages(m => [...m, {role:'user', text: input}, {role:'assistant', text: reply}])
setInput('')
}


return (
<div className="card p-4">
<div className="card-title mb-2">AI Assistant</div>
<div className="h-40 overflow-auto space-y-2 border rounded-xl p-2">
{messages.map((m,i)=> (
<div key={i} className={`text-sm ${m.role==='assistant' ? 'text-auren-navy' : 'text-slate-600'}`}>
<strong className="mr-1">{m.role}:</strong>{m.text}
</div>
))}
</div>
<div className="mt-3 flex gap-2">
<input className="input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask OpsAgent..."/>
<Button variant="primary" onClick={send}>Send</Button>
</div>
</div>
)
}