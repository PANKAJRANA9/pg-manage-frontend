
import React, { useEffect, useState } from 'react';
import { tenantsAPI, roomsAPI } from '../utils/api.js';
import { Button, Modal } from '../components/ui/index.jsx';

export default function Tenants(){
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name:'', phone:'', email:'', roomNumber:'', joinDate:'', gender:'Male' });

  const load = async ()=>{
    setLoading(true);
    const [t,r] = await Promise.all([tenantsAPI.getAll(), roomsAPI.getAll()]);
    setTenants(t); setRooms(r); setLoading(false);
  };
  useEffect(()=>{ load(); },[]);

  const filtered = tenants.filter(t=> (t.name+' '+t.phone+' '+t.email+' '+t.roomNumber).toLowerCase().includes(query.toLowerCase()));

  const submit = async (e)=>{
    e.preventDefault();
    if(edit) await tenantsAPI.update(edit.id, form);
    else await tenantsAPI.create({ id: Date.now(), ...form });
    setOpen(false); setEdit(null); load();
  };

  const onEdit = (t)=>{
    setEdit(t);
    setForm({ name:t.name, phone:t.phone, email:t.email, roomNumber:t.roomNumber, joinDate:t.joinDate, gender:t.gender||'Male' });
    setOpen(true);
  };
  const onDelete = async (id)=>{
    if(!confirm('Delete tenant?')) return;
    await tenantsAPI.delete(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold">Tenants</h1><p className="text-sm text-slate-500">Manage tenant records</p></div>
        <Button onClick={()=>{ setEdit(null); setForm({ name:'', phone:'', email:'', roomNumber:'', joinDate: new Date().toISOString().slice(0,10), gender:'Male' }); setOpen(true); }}>+ Add Tenant</Button>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-slate-100 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name, phone, email, room..." className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] text-[11px] font-bold text-slate-500 uppercase"><tr><th className="px-5 py-3 text-left">Name</th><th className="px-5 py-3 text-left">Phone</th><th className="px-5 py-3 text-left">Room No</th><th className="px-5 py-3 text-left">Join Date</th><th className="px-5 py-3 text-left">Action</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-500">Loading...</td></tr> : filtered.map(t=>(
                <tr key={t.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-3.5"><div className="font-semibold">{t.name}</div><div className="text-xs text-slate-500">{t.email}</div></td>
                  <td className="px-5 py-3.5">{t.phone}</td>
                  <td className="px-5 py-3.5"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">{t.roomNumber}</span></td>
                  <td className="px-5 py-3.5">{t.joinDate}</td>
                  <td className="px-5 py-3.5 flex gap-2"><button onClick={()=>onEdit(t)} className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg">✎</button><button onClick={()=>onDelete(t.id)} className="w-7 h-7 bg-red-50 text-red-600 rounded-lg">🗑</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={edit?'Edit Tenant':'Add Tenant'} footer={<><button onClick={()=>setOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button><button onClick={submit} className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">{edit?'Update':'Create'}</button></>}>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="label">Full Name</label><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Phone</label><input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/></div>
            <div><label className="label">Email</label><input className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Room No</label><select className="input" value={form.roomNumber} onChange={e=>setForm({...form,roomNumber:e.target.value})}><option value="">Select</option>{rooms.map(r=><option key={r.id} value={r.roomNumber}>{r.roomNumber}</option>)}</select></div>
            <div><label className="label">Join Date</label><input type="date" className="input" value={form.joinDate} onChange={e=>setForm({...form,joinDate:e.target.value})} /></div>
          </div>
          <div><label className="label">Gender</label><select className="input" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}><option>Male</option><option>Female</option><option>Other</option></select></div>
        </form>
      </Modal>
    </div>
  )
}
