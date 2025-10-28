import React from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'


export default function ChartWidget({data, title='Task Velocity'}){
const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const chart = labels.map((d,i)=>({name:d, val:data[i] ?? data[data.length-1]}))
return (
<div className="card p-4">
<div className="card-title mb-3">{title}</div>
<div className="h-56">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={chart}>
<XAxis dataKey="name"/>
<YAxis allowDecimals={false}/>
<Tooltip/>
<Line type="monotone" dataKey="val" strokeWidth={2} dot={false} />
</LineChart>
</ResponsiveContainer>
</div>
</div>
)
}