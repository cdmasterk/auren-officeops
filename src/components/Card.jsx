import React from 'react'


export default function Card({title, action, children, className=''}){
return (
<div className={`card p-4 ${className}`}>
<div className="flex items-center justify-between mb-3">
<div className="card-title">{title}</div>
{action}
</div>
{children}
</div>
)
}