
import React, { useEffect, useState } from 'react';
import { bookingsAPI, tenantsAPI, roomsAPI } from '../utils/api.js';
import { Badge, Button, Modal } from '../components/ui/index.jsx';

export default function Bookings(){
  const [bookings, setBookings] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ tenantId:'', tenantName:'', roomId:'', roomNumber:'', checkIn:'', checkOut:'', monthlyRent:'', status:'Active', dueDay:5 });

  const load = async ()=>{
    setLoading(true);
    const [b,t,r] = await Promise.all([bookingsAPI.getAll(), tenantsAPI.getAll(), roomsAPI.getAll()]);
    setBookings(Array.isArray(b)?b:[]); setTenants(Array.isArray(t)?t:[]); setRooms(Array.isArray(r)?r:[]); setLoading(false);
  };
  useEffect(()=>{ load(); },[]);

  const submit = async (e)=>{
    e.preventDefault();
    const payload = { ...form, tenantId: Number(form.tenantId)||Date.now(), roomId: Number(form.roomId)||1, monthlyRent: Number(form.monthlyRent) };
    if(edit) await bookingsAPI.update(edit.id, payload);
    else await bookingsAPI.create(payload);
    setOpen(false); setEdit(null); load();
  };

  const onEdit = (b)=>{
    setEdit(b);
    setForm({ tenantId:b.tenantId, tenantName:b.tenantName, roomId:b.roomId, roomNumber:b.roomNumber, checkIn:b.checkIn, checkOut:b.checkOut, monthlyRent:b.monthlyRent, status:b.status, dueDay:b.dueDay||5 });
    setOpen(true);
  };

  const handleTenantChange = (tenantId)=>{
    const t = tenants.find(x=> x.id==tenantId);
    if(t) setForm(f=>({...f, tenantId: t.id, tenantName: t.name, roomNumber: t.roomNumber }));
  };
  const handleRoomChange = (roomId)=>{
    const r = rooms.find(x=> x.id==roomId);
    if(r) setForm(f=>({...f, roomId: r.id, roomNumber: r.roomNumber, monthlyRent: r.rentAmount }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold">Bookings</h1><p className="text-sm text-slate-500">Track check-in / check-out</p></div>
        <Button onClick={()=>{ setEdit(null); setForm({ tenantId:'', tenantName:'', roomId:'', roomNumber:'', checkIn:'', checkOut:'', monthlyRent:'', status:'Active', dueDay:5 }); setOpen(true); }}>+ Add Booking</Button>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] text-[11px] font-bold text-slate-500 uppercase"><tr><th className="px-5 py-3 text-left">Tenant Name</th><th className="px-5 py-3 text-left">Room No</th><th className="px-5 py-3 text-left">Check In</th><th className="px-5 py-3 text-left">Check Out</th><th className="px-5 py-3 text-left">Status</th><th className="px-5 py-3 text-left">Action</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={6} className="px-5 py-8 text-center">Loading...</td></tr> : (Array.isArray(bookings)?bookings:[]).map(b=>(
                <tr key={b.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-medium">{b.tenantName}</td>
                  <td className="px-5 py-3.5">{b.roomNumber}</td>
                  <td className="px-5 py-3.5">{b.checkIn}</td>
                  <td className="px-5 py-3.5">{b.checkOut}</td>
                  <td className="px-5 py-3.5"><Badge>{b.status}</Badge></td>
                  <td className="px-5 py-3.5 flex gap-2"><button onClick={()=>onEdit(b)} className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg">✎</button><button onClick={async()=>{ if(confirm('Delete?')){ await bookingsAPI.delete(b.id); load(); } }} className="w-7 h-7 bg-red-50 text-red-600 rounded-lg">🗑</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={edit?'Edit Booking':'Add Booking'} footer={<><button onClick={()=>setOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button><button onClick={submit} className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">{edit?'Update':'Create'}</button></>}>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="label">Tenant</label><select className="input" value={form.tenantId} onChange={e=>handleTenantChange(e.target.value)} required><option value="">Select tenant</option>{(Array.isArray(tenants)?tenants:[]).map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
          <div><label className="label">Room</label><select className="input" value={form.roomId} onChange={e=>handleRoomChange(e.target.value)}><option value="">Select room</option>{rooms.map(r=><option key={r.id} value={r.id}>{r.roomNumber} - {r.type} ₹{r.rentAmount}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Check In</label><input type="date" className="input" value={form.checkIn} onChange={e=>setForm({...form,checkIn:e.target.value})} required/></div>
            <div><label className="label">Check Out</label><input type="date" className="input" value={form.checkOut} onChange={e=>setForm({...form,checkOut:e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Monthly Rent (₹)</label><input type="number" className="input" value={form.monthlyRent} onChange={e=>setForm({...form,monthlyRent:e.target.value})} placeholder="auto-filled from room"/></div>
            <div><label className="label">Due Day</label><input type="number" className="input" value={form.dueDay} onChange={e=>setForm({...form,dueDay:e.target.value})} min={1} max={28}/></div>
          </div>
          <div><label className="label">Status</label><select className="input" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Active</option><option>Confirmed</option><option>Pending</option></select></div>
        </form>
      </Modal>
    </div>
  )
}
