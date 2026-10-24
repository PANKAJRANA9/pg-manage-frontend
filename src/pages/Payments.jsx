
import React, { useState, useMemo } from 'react';
import { payments as initialPayments } from '../data/mockData.js';
import { Badge, Button, Modal } from '../components/ui/index.jsx';

export default function Payments(){
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ tenantName:'', email:'', month:'Oct 2025', amount:'', dueDate:'2025-10-05', status:'Pending' });

  const stats = useMemo(()=>{
    const total = payments.reduce((s,x)=>s+Number(x.amount||0),0);
    const pending = payments.filter(x=>x.status==='Pending');
    const overdue = payments.filter(x=>x.status==='Overdue');
    const paid = payments.filter(x=>x.status==='Paid');
    return {
      total: `₹${total.toLocaleString()}`,
      pendingAmt: `₹${pending.reduce((s,x)=>s+Number(x.amount||0),0).toLocaleString()}`,
      pendingCount: pending.length,
      overdueAmt: `₹${overdue.reduce((s,x)=>s+Number(x.amount||0),0).toLocaleString()}`,
      overdueCount: overdue.length,
      paidAmt: `₹${paid.reduce((s,x)=>s+Number(x.amount||0),0).toLocaleString()}`,
      paidCount: paid.length
    };
  },[payments]);

  const filtered = useMemo(()=>{
    let list = [...payments];
    if(search){
      const q = search.toLowerCase();
      list = list.filter(p=> (p.tenantName+' '+p.email).toLowerCase().includes(q));
    }
    if(statusFilter!=='All') list = list.filter(p=>p.status===statusFilter);
    return list;
  },[payments, search, statusFilter]);

  const submit = (e)=>{
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      paymentId: `PAY-${String(Date.now()).slice(-4)}`,
      initials: form.tenantName.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase(),
      color: '#2563eb',
      ...form,
      amount: Number(form.amount)
    };
    setPayments([newItem, ...payments]);
    setOpen(false);
    setForm({ tenantName:'', email:'', month:'Oct 2025', amount:'', dueDate:'2025-10-05', status:'Pending' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold">Rent Payment Management</h1>
          <p className="text-sm text-slate-600">100% Mocked POC - No Backend - Client Demo</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <span className="absolute left-3 top-2.5">🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tenant..." className="pl-9 pr-3 py-2.5 rounded-lg border text-sm w-[200px]" />
          </div>
          <Button onClick={()=>setOpen(true)}>+ Add Payment</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border shadow-card"><div className="text-sm text-slate-600">Total Revenue</div><div className="text-2xl font-extrabold mt-1">{stats.total}</div><div className="text-xs text-emerald-600 mt-1">▲ +12% from last month</div></div>
        <div className="bg-white rounded-xl p-5 border shadow-card"><div className="text-sm text-slate-600">Pending</div><div className="text-2xl font-extrabold mt-1">{stats.pendingAmt}</div><div className="text-xs text-orange-600 mt-1">{stats.pendingCount} pending</div></div>
        <div className="bg-white rounded-xl p-5 border shadow-card"><div className="text-sm text-slate-600">Overdue</div><div className="text-2xl font-extrabold mt-1">{stats.overdueAmt}</div><div className="text-xs text-red-600 mt-1">{stats.overdueCount} overdue</div></div>
        <div className="bg-white rounded-xl p-5 border shadow-card"><div className="text-sm text-slate-600">Paid</div><div className="text-2xl font-extrabold mt-1">{stats.paidAmt}</div><div className="text-xs text-emerald-600 mt-1">{stats.paidCount} completed</div></div>
      </div>

      <div className="bg-white rounded-xl border shadow-card overflow-hidden">
        <div className="p-4 border-b flex gap-2">
          {['All','Paid','Pending','Overdue'].map(s=><button key={s} onClick={()=>setStatusFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${statusFilter===s?'bg-blue-600 text-white border-blue-600':'bg-white'}`}>{s}</button>)}
          <span className="ml-auto text-sm text-slate-500">{filtered.length} results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-xs"><tr><th className="text-left p-3">Tenant</th><th className="text-left p-3">Month</th><th className="text-left p-3">Amount</th><th className="text-left p-3">Due Date</th><th className="text-left p-3">Status</th></tr></thead>
            <tbody>{filtered.map(p=><tr key={p.id} className="border-t hover:bg-slate-50"><td className="p-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:p.color}}>{p.initials}</div><div><div className="font-semibold">{p.tenantName}</div><div className="text-xs text-slate-500">{p.email}</div></div></div></td><td className="p-3">{p.month}</td><td className="p-3 font-medium">₹{p.amount}</td><td className="p-3">{p.dueDate}</td><td className="p-3"><Badge>{p.status}</Badge></td></tr>)}</tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Add Payment" footer={<><button onClick={()=>setOpen(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button><button onClick={submit} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Create</button></>}>
        <div className="space-y-4">
          <div><label className="label">Tenant Name</label><input className="input" value={form.tenantName} onChange={e=>setForm({...form, tenantName:e.target.value})} required /></div>
          <div><label className="label">Email</label><input className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label">Month</label><input className="input" value={form.month} onChange={e=>setForm({...form, month:e.target.value})} /></div><div><label className="label">Amount</label><input type="number" className="input" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} required /></div></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="label">Due Date</label><input type="date" className="input" value={form.dueDate} onChange={e=>setForm({...form, dueDate:e.target.value})} /></div><div><label className="label">Status</label><select className="input" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}><option>Paid</option><option>Pending</option><option>Overdue</option></select></div></div>
        </div>
      </Modal>
    </div>
  );
}
