
import React, { useState } from 'react';
import { bookings as initial } from '../data/mockData.js';
import { Badge, Button, Modal } from '../components/ui/index.jsx';
export default function Bookings(){
  const [list, setList] = useState(initial);
  const [search, setSearch] = useState('');
  const filtered = list.filter(x=> JSON.stringify(x).toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div><h1 className="text-[28px] font-extrabold">Bookings</h1><p className="text-sm text-slate-600">100% Mocked POC - No Backend</p></div>
        <div className="flex gap-2">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="px-3 py-2 rounded-lg border text-sm" />
          <Button>+ Add Booking</Button>
        </div>
      </div>
      <div className="bg-white rounded-xl border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-xs"><tr>{Object.keys(initial[0]||{}).slice(0,5).map(k=><th key={k} className="text-left p-3">{k}</th>)}<th className="text-left p-3">Action</th></tr></thead>
            <tbody>{filtered.map(item=><tr key={item.id} className="border-t hover:bg-slate-50">{Object.keys(initial[0]||{}).slice(0,5).map(k=><td key={k} className="p-3">{String(item[k]||'')}</td>)}<td className="p-3"><Badge>Active</Badge></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
