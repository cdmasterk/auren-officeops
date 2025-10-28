import React from 'react'
import Button from './Button'


export default function Topbar(){
return (
<div className="h-16 flex items-center justify-between px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-auren-cyan to-auren-orange"/>
<div className="font-semibold text-auren-navy">Auren Labs — OfficeOps</div>
</div>
<div className="flex items-center gap-2">
<Button variant="ghost">Feedback</Button>
<Button>New Task</Button>
<div className="w-8 h-8 rounded-full bg-auren-blue/10 border"/>
</div>
</div>
)
}