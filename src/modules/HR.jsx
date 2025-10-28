import React, {useState} from 'react'
import Card from '../components/Card'
import Button from '../components/Button'


export default function HR(){
const [candidate, setCandidate] = useState({name:'Alex Reed', role:'Assistant', status:'Offer pending'})


const createOnboarding = () => {
alert('Onboarding workflow created: accounts, checklist, laptop order')
setCandidate({...candidate, status:'Onboarding'})
}


return (
<div className="space-y-6">
<Card title="Recruitment" action={<Button>View Applicants</Button>}>
<div className="flex items-center justify-between">
<div>
<div className="font-medium">{candidate.name} — {candidate.role}</div>
<div className="text-sm text-muted">Status: {candidate.status}</div>
</div>
<div className="flex gap-2">
<Button onClick={createOnboarding}>Start Onboarding</Button>
<Button variant="primary">Schedule Interview</Button>
</div>
</div>
</Card>


<Card title="Onboarding Templates" action={<Button>Manage</Button>}>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
{['Advisor','Assistant','Intern'].map((r,i)=> (
<button key={i} className="p-3 border rounded-xl text-left hover:bg-auren-bg">
<div className="font-medium">{r}</div>
<div className="text-sm text-muted">Creates role-based checklist & access</div>
</button>
))}
</div>
</Card>
</div>
)
}