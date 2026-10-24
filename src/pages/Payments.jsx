
import React, { useEffect, useState, useMemo } from 'react';
import { paymentsAPI, bookingsAPI, tenantsAPI } from '../utils/api.js';
import { Button, Modal, Badge } from '../components/ui/index.jsx';

const formatINR = (n)=> `₹${Number(n).toLocaleString('en-IN')}`;

export default function Payments(){
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // All | Paid | Pending | Overdue
  const [timeFilter, setTimeFilter] = useState('All'); // All | This Month | Last 30 Days
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ tenantName:'', email:'', month:'', amount:'', dueDate:'', status:'Pending', paymentMode:'UPI', transactionRef:'', bookingId:'' });

  const load = async ()=>{
    setLoading(true);
    const [p,b,t] = await Promise.all([paymentsAPI.getAll(), bookingsAPI.getAll(), tenantsAPI.getAll()]);
    setPayments(p); setBookings(b); setTenants(t); setLoading(false);
  };
  useEffect(()=>{ load(); },[]);

  const stats = useMemo(()=>{
    const total = payments.reduce((s,x)=> s + Number(x.amount), 0);
    const pending = payments.filter(x=> x.status==='Pending');
    const overdue = payments.filter(x=> x.status==='Overdue');
    const paid = payments.filter(x=> x.status==='Paid');
    return {
      total,
      totalStr: formatINR(total),
      pendingAmt: formatINR(pending.reduce((s,x)=> s+Number(x.amount),0)),
      pendingCount: pending.length,
      overdueAmt: formatINR(overdue.reduce((s,x)=> s+Number(x.amount),0)),
      overdueCount: overdue.length,
      paidAmt: formatINR(paid.reduce((s,x)=> s+Number(x.amount),0)),
      paidCount: paid.length
    };
  }, [payments]);

  const filtered = useMemo(()=>{
    let list = [...payments];
    if(search){
      const q = search.toLowerCase();
      list = list.filter(p=> (p.tenantName+' '+p.email+' '+p.paymentId).toLowerCase().includes(q));
    }
    if(statusFilter!=='All'){
      list = list.filter(p=> p.status===statusFilter);
    }
    if(timeFilter==='This Month'){
      const now = new Date();
      list = list.filter(p=> {
        const d = new Date(p.dueDate);
        return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
      });
    } else if(timeFilter==='Last 30 Days'){
      const cutoff = Date.now() - 30*24*3600*1000;
      list = list.filter(p=> new Date(p.dueDate).getTime() >= cutoff);
    }
    return list;
  },[payments, search, statusFilter, timeFilter]);

  const submit = async (e)=>{
    e.preventDefault();
    const payload = {
      ...form,
      amount: Number(form.amount),
      tenantName: form.tenantName,
      initials: form.tenantName.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase(),
      color: '#2563eb',
      month: form.month,
      dueDate: form.dueDate,
      status: form.status,
      paymentMode: form.paymentMode,
      transactionRef: form.transactionRef,
      bookingId: Number(form.bookingId)||bookings[0]?.id||4
    };
    if(edit) await paymentsAPI.update(edit.id, payload);
    else await paymentsAPI.create(payload);
    setOpen(false); setEdit(null); setForm({ tenantName:'', email:'', month:'', amount:'', dueDate:'', status:'Pending', paymentMode:'UPI', transactionRef:'', bookingId:'' });
    load();
  };

  const onEdit = (p)=>{
    setEdit(p);
    setForm({ tenantName:p.tenantName, email:p.email||'', month:p.month, amount:p.amount, dueDate:p.dueDate?.slice(0,10), status:p.status, paymentMode:p.paymentMode||'UPI', transactionRef:p.transactionRef||'', bookingId:p.bookingId });
    setOpen(true);
  };

  const handleBookingSelect = (bid)=>{
    const b = bookings.find(x=> x.id==bid || x.bookingId==bid);
    if(b){
      const tenant = tenants.find(t=> t.id==b.tenantId);
      setForm(f=>({
        ...f,
        bookingId: b.id,
        tenantName: tenant?.name || b.tenantName,
        email: tenant?.email || '',
        amount: b.monthlyRent || f.amount,
        month: new Date().toLocaleDateString('en-US',{month:'short',year:'numeric'})
      }));
    }
  };

  const exportCSV = ()=>{
    const rows = [['Payment ID','Tenant Name','Email','Month','Amount','Due Date','Status','Mode','Ref']].concat(filtered.map(p=>[p.paymentId,p.tenantName,p.email,p.month,p.amount,p.dueDate,p.status,p.paymentMode,p.transactionRef]));
    const csv = rows.map(r=> r.map(v=> `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='payments.csv'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header like screenshot RentPay */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight">Rent Payment Management</h1>
          <p className="text-sm text-slate-600 mt-1">Manage tenant rent payments, track due dates and payment status</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by tenant, email..." className="pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm w-[220px] bg-white" />
          </div>
          <button className="px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-sm flex items-center gap-1">▽ Filters</button>
          <Button onClick={()=>{ setEdit(null); setForm({ tenantName:'', email:'', month: new Date().toLocaleDateString('en-US',{month:'short',year:'numeric'}), amount:'', dueDate: new Date().toISOString().slice(0,10), status:'Pending', paymentMode:'UPI', transactionRef:'', bookingId:'' }); setOpen(true); }}>+ Add Payment</Button>
        </div>
      </div>

      {/* Top 4 cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
          <div className="flex items-center gap-2 text-sm text-slate-600"><span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">₹</span>Total Revenue</div>
          <div className="text-[32px] font-extrabold mt-2">₹42,500</div>
          <div className="text-[13px] text-emerald-600 font-medium mt-1">▲ +12% from last month</div>
        </div>
        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
          <div className="flex items-center gap-2 text-sm text-slate-600"><span className="w-7 h-7 rounded-full bg-orange-400 text-white flex items-center justify-center">⏰</span>Pending</div>
          <div className="text-[32px] font-extrabold mt-2">{stats.pendingAmt}</div>
          <div className="text-[13px] text-amber-700 font-medium mt-1">{stats.pendingCount} payments pending</div>
        </div>
        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
          <div className="flex items-center gap-2 text-sm text-slate-600"><span className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center">⚠</span>Overdue</div>
          <div className="text-[32px] font-extrabold mt-2">{stats.overdueAmt}</div>
          <div className="text-[13px] text-red-600 font-medium mt-1">{stats.overdueCount} payments overdue</div>
        </div>
        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
          <div className="flex items-center gap-2 text-sm text-slate-600"><span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">✓</span>Paid</div>
          <div className="text-[32px] font-extrabold mt-2">{stats.paidAmt}</div>
          <div className="text-[13px] text-emerald-600 font-medium mt-1">{stats.paidCount} payments completed</div>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
        {/* Tabs */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <button onClick={()=>setStatusFilter('All')} className={`text-[18px] font-bold pb-1 ${statusFilter==='All' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-slate-500'}`}>All Payments</button>
            <span className="h-6 w-px bg-slate-200"></span>
            <button onClick={()=>setTimeFilter(timeFilter==='This Month' ? 'All' : 'This Month')} className={`text-left ${timeFilter==='This Month' ? 'text-blue-700 font-semibold' : 'text-slate-600'}`}><div className="text-[13px]">This Month</div></button>
            <div className="text-slate-400 text-xs">|</div>
            <button onClick={()=>setTimeFilter(timeFilter==='Last 30 Days' ? 'All' : 'Last 30 Days')} className={`text-[13px] ${timeFilter==='Last 30 Days' ? 'text-blue-700 font-semibold' : 'text-slate-600'}`}>Last 30 Days</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">{filtered.length} results • Updated just now</span>
            <button onClick={exportCSV} className="text-xs border border-slate-200 px-3 py-1.5 rounded-lg bg-white">Export CSV</button>
          </div>
        </div>

        {/* Status quick tabs */}
        <div className="px-6 py-3 flex gap-2 border-b border-slate-50">
          {['All','Paid','Pending','Overdue'].map(s=>(
            <button key={s} onClick={()=>setStatusFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${statusFilter===s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{s}</button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#eef0f3] text-[13px] font-bold text-slate-700">
              <tr>
                <th className="text-left px-6 py-3">Tenant Name</th>
                <th className="text-left px-4 py-3">Month →</th>
                <th className="text-left px-4 py-3">Amount →</th>
                <th className="text-left px-4 py-3">Due Date →</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={6} className="text-center py-10 text-slate-500">Loading payments...</td></tr> :
                filtered.length===0 ? <tr><td colSpan={6} className="text-center py-12"><div className="text-3xl mb-2">💸</div><div className="font-semibold">No payments found</div><div className="text-xs text-slate-500">Try changing filters</div></td></tr> :
                filtered.map(p=>(
                  <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50/70">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{backgroundColor: p.color||'#2563eb'}}>
                          {p.initials||p.tenantName.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px] leading-tight">{p.tenantName}</div>
                          <div className="text-[12px] text-slate-500">{p.email||''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-700">{p.month}</td>
                    <td className="px-4 py-3.5 font-medium">₹{Number(p.amount).toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-slate-700">{p.dueDate ? new Date(p.dueDate).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : '-'}</td>
                    <td className="px-4 py-3.5"><Badge>{p.status}</Badge></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <button onClick={()=>onEdit(p)} className="w-7 h-7 hover:bg-white hover:shadow rounded-lg flex items-center justify-center">✎</button>
                        <button className="w-7 h-7 hover:bg-white hover:shadow rounded-lg flex items-center justify-center">↓</button>
                        <button className="w-7 h-7 hover:bg-white rounded-lg">⋮</button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm">
          <span className="text-slate-600">Showing 1 to {Math.min(6, filtered.length)} of {filtered.length} results</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg border bg-white">‹</button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold">1</button>
            <button className="w-8 h-8 rounded-lg border bg-white">3</button>
            <span className="px-2">···</span>
            <span className="px-2 text-slate-500">5</span>
            <button className="w-8 h-8 rounded-lg">›</button>
          </div>
        </div>
      </div>

      {/* Add Payment Modal - RentPay style */}
      <Modal open={open} onClose={()=>setOpen(false)} title={edit ? 'Edit Payment' : 'Add Payment'} footer={
        <>
          <button onClick={()=>setOpen(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm">Cancel</button>
          <button onClick={submit} className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">{edit ? 'Update Payment' : 'Create Payment'}</button>
        </>
      }>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Booking</label>
            <select className="input" value={form.bookingId} onChange={e=>handleBookingSelect(e.target.value)} >
              <option value="">Select booking (auto fills rent)</option>
              {bookings.map(b=><option key={b.id} value={b.id}>{b.bookingId} - {b.tenantName} - Room {b.roomNumber} - ₹{b.monthlyRent}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Tenant Name</label><input className="input" value={form.tenantName} onChange={e=>setForm({...form, tenantName:e.target.value})} required /></div>
            <div><label className="label">Email</label><input className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Month (e.g. Oct 2025)</label><input className="input" value={form.month} onChange={e=>setForm({...form, month:e.target.value})} required placeholder="Oct 2025"/></div>
            <div><label className="label">Amount (₹)</label><input type="number" className="input" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Due Date</label><input type="date" className="input" value={form.dueDate} onChange={e=>setForm({...form, dueDate:e.target.value})} required/></div>
            <div><label className="label">Status</label><select className="input" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}><option>Paid</option><option>Pending</option><option>Overdue</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Payment Mode</label><select className="input" value={form.paymentMode} onChange={e=>setForm({...form, paymentMode:e.target.value})}><option>UPI</option><option>CASH</option><option>BANK_TRANSFER</option></select></div>
            <div><label className="label">Transaction Ref</label><input className="input" value={form.transactionRef} onChange={e=>setForm({...form, transactionRef:e.target.value})} placeholder="UPI ref / TXN id"/></div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
