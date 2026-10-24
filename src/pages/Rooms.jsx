
import React, { useEffect, useState } from 'react';
import { roomsAPI } from '../utils/api.js';
import { Badge, Button, Modal } from '../components/ui/index.jsx';

export default function Rooms(){
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ roomNumber:'', type:'Single', rentAmount:'', floor:1, status:'Available' });

  const load = async ()=>{
    setLoading(true);
    const data = await roomsAPI.getAll();
    setRooms(data);
    setLoading(false);
  };
  useEffect(()=>{ load(); },[]);

  const filtered = rooms.filter(r=> (r.roomNumber+' '+r.type+' '+r.status).toLowerCase().includes(query.toLowerCase()));

  const submit = async (e)=>{
    e.preventDefault();
    const payload = { ...form, rentAmount: Number(form.rentAmount), floor: Number(form.floor) };
    if(edit) await roomsAPI.update(edit.id, payload);
    else await roomsAPI.create(payload);
    setOpen(false); setEdit(null); setForm({ roomNumber:'', type:'Single', rentAmount:'', floor:1, status:'Available' });
    load();
  };

  const onEdit = (room)=>{
    setEdit(room);
    setForm({ roomNumber: room.roomNumber, type: room.type, rentAmount: room.rentAmount, floor: room.floor, status: room.status });
    setOpen(true);
  };

  const onDelete = async (id)=>{
    if(!confirm('Delete this room?')) return;
    await roomsAPI.delete(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Rooms</h1>
          <p className="text-sm text-slate-500 mt-1">Manage room inventory and occupancy</p>
        </div>
        <Button onClick={()=>{ setEdit(null); setForm({ roomNumber:'', type:'Single', rentAmount:'', floor:1, status:'Available' }); setOpen(true); }}>+ Add Room</Button>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-slate-100 p-4 flex items-center gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by room no, type, status..." className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm" />
        </div>
        <select className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white">
          <option>All Status</option><option>Available</option><option>Occupied</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">Loading rooms...</div>
        ) : filtered.length===0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">🚪</div>
            <div className="font-semibold text-slate-700">No rooms found</div>
            <div className="text-sm text-slate-500 mt-1">Try adjusting filters or add a new room</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f8fafc] text-[11px] font-bold text-slate-500 uppercase">
                <tr><th className="text-left px-5 py-3">Room No</th><th className="text-left px-5 py-3">Type</th><th className="text-left px-5 py-3">Rent (₹)</th><th className="text-left px-5 py-3">Floor</th><th className="text-left px-5 py-3">Status</th><th className="text-left px-5 py-3">Action</th></tr>
              </thead>
              <tbody>
                {filtered.map(r=>(
                  <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50/70">
                    <td className="px-5 py-3.5 font-semibold">{r.roomNumber}</td>
                    <td className="px-5 py-3.5">{r.type}</td>
                    <td className="px-5 py-3.5">₹{r.rentAmount}</td>
                    <td className="px-5 py-3.5">{r.floor}</td>
                    <td className="px-5 py-3.5"><Badge>{r.status}</Badge></td>
                    <td className="px-5 py-3.5 flex items-center gap-2">
                      <button onClick={()=>onEdit(r)} className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">✎</button>
                      <button onClick={()=>onDelete(r.id)} className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={edit ? 'Edit Room' : 'Add Room'} footer={
        <>
          <button onClick={()=>setOpen(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm">Cancel</button>
          <button onClick={submit} className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">{edit ? 'Update' : 'Create'}</button>
        </>
      }>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="label">Room Number</label><input className="input" value={form.roomNumber} onChange={e=>setForm({...form,roomNumber:e.target.value})} required placeholder="e.g. 101"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Type</label><select className="input" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Single</option><option>Double</option><option>Triple</option></select></div>
            <div><label className="label">Floor</label><input type="number" className="input" value={form.floor} onChange={e=>setForm({...form,floor:e.target.value})} /></div>
          </div>
          <div><label className="label">Rent Amount (₹)</label><input type="number" className="input" value={form.rentAmount} onChange={e=>setForm({...form,rentAmount:e.target.value})} required /></div>
          <div><label className="label">Status</label><select className="input" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Available</option><option>Occupied</option></select></div>
        </form>
      </Modal>
    </div>
  )
}
