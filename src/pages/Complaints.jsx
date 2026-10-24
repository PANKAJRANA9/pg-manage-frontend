
import React, { useEffect, useState } from 'react';
import { complaintsAPI } from '../utils/api.js';
import { Badge, Button, Modal } from '../components/ui/index.jsx';

export default function Complaints(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ tenantName:'', subject:'', description:'', status:'Open', priority:'Medium' });

  const load = async ()=>{
    setLoading(true);
    const data = await complaintsAPI.getAll();
    setList(data);
    setLoading(false);
  };
  useEffect(()=>{ load(); },[]);

  const submit = async (e)=>{
    e.preventDefault();
    if(edit) await complaintsAPI.update(edit.id, form);
    else await complaintsAPI.create({ id: Date.now(), ...form, createdAt: new Date().toISOString().slice(0,10) });
    setOpen(false); setEdit(null); load();
  };

  const onEdit = (c)=>{
    setEdit(c);
    setForm({ tenantName:c.tenantName, subject:c.subject, description:c.description||'', status:c.status, priority:c.priority });
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold">Complaints</h1><p className="text-sm text-slate-500">Handle maintenance and issues</p></div>
        <Button onClick={()=>{ setEdit(null); setForm({ tenantName:'', subject:'', description:'', status:'Open', priority:'Medium' }); setOpen(true); }}>+ Add Complaint</Button>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] text-[11px] font-bold text-slate-500 uppercase"><tr><th className="px-5 py-3 text-left">Tenant Name</th><th className="px-5 py-3 text-left">Subject</th><th className="px-5 py-3 text-left">Status</th><th className="px-5 py-3 text-left">Priority</th><th className="px-5 py-3 text-left">Action</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={5} className="px-5 py-8 text-center">Loading...</td></tr> : list.map(c=>(
                <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-medium">{c.tenantName}</td>
                  <td className="px-5 py-3.5">{c.subject}</td>
                  <td className="px-5 py-3.5"><Badge>{c.status}</Badge></td>
                  <td className="px-5 py-3.5"><span className={`text-xs font-bold px-2 py-1 rounded-full ${c.priority==='High' ? 'bg-red-50 text-red-600' : c.priority==='Medium' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>{c.priority}</span></td>
                  <td className="px-5 py-3.5 flex gap-2"><button onClick={()=>onEdit(c)} className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg">✎</button><button onClick={async()=>{ if(confirm('Delete?')){ await complaintsAPI.delete(c.id); load(); } }} className="w-7 h-7 bg-red-50 text-red-600 rounded-lg">🗑</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={edit?'Edit Complaint':'Add Complaint'} footer={<><button onClick={()=>setOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button><button onClick={submit} className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">{edit?'Update':'Create'}</button></>}>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="label">Tenant Name</label><input className="input" value={form.tenantName} onChange={e=>setForm({...form,tenantName:e.target.value})} required/></div>
          <div><label className="label">Subject</label><input className="input" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} required/></div>
          <div><label className="label">Description</label><textarea className="input" rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Status</label><select className="input" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Open</option><option>In Progress</option><option>Resolved</option></select></div>
            <div><label className="label">Priority</label><select className="input" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>High</option><option>Medium</option><option>Low</option></select></div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
