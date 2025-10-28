export const staff = [
{ id: 'rachel', name: 'Rachel Elam', role: 'Office Manager' },
{ id: 'larry', name: 'Larry Botts', role: 'Principal Advisor' },
{ id: 'jane', name: 'Jane Miller', role: 'Advisor' },
{ id: 'tom', name: 'Tom Chen', role: 'Assistant' }
];


export const tasks = [
{ id:'t1', title:'Run payroll pre-check', owner:'rachel', due:'2025-10-30', status:'pending', tags:['payroll'] },
{ id:'t2', title:'Collect missing W-2 from J. Miller', owner:'tom', due:'2025-10-29', status:'in-progress', tags:['docs'] },
{ id:'t3', title:'Prepare Larry monthly ops report', owner:'rachel', due:'2025-10-31', status:'pending', tags:['report'] },
{ id:'t4', title:'Onboard new assistant (A. Reed)', owner:'jane', due:'2025-11-02', status:'pending', tags:['onboarding'] }
];


export const payrollQueue = [
{ id:'p1', employee:'Jane Miller', status:'Needs approval', anomalies:['Overtime +6h'], week:'W43' },
{ id:'p2', employee:'Tom Chen', status:'Ready', anomalies:[], week:'W43' }
];


export const kpis = {
taskVelocity: [8, 12, 10, 15, 17, 16, 22],
completionRate: 0.89,
overdue: 2,
predictions: [
{ id:'pred1', text:'Payroll approval likely to slip by 1 day. Send reminder to Larry?' },
{ id:'pred2', text:'Onboarding checklist 60% complete. Auto-create remaining tasks?' }
]
}