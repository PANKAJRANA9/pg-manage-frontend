
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { rooms, tenants, bookings, payments, monthlyCollection } from '../data/mockData.js';
import { Badge } from '../components/ui/index.jsx';

export default function Dashboard(){
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[32px] font-extrabold tracking-tight">Finance Overview</h1>
        <p className="text-sm text-slate-600 mt-1">POC - 100% Mocked Data - No Backend • Updated Today</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl p-6 shadow-card border">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">🏢</div>
          <div className="mt-4 text-sm text-slate-600">Total Rooms</div>
          <div className="text-[48px] font-extrabold leading-none">{rooms.length}</div>
          <div className="text-xs text-emerald-600 mt-2">↗ Active rooms</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-card border">
          <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center text-white">👥</div>
          <div className="mt-4 text-sm text-slate-600">Total Tenants</div>
          <div className="text-[48px] font-extrabold leading-none">{tenants.length}</div>
          <div className="text-xs text-slate-500 mt-2">4 male • 4 female</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-card border">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white">$</div>
          <div className="mt-4 text-sm text-slate-600">Paid Rent</div>
          <div className="text-[48px] font-extrabold leading-none text-emerald-600">6</div>
          <div className="text-sm font-bold text-emerald-600 mt-2">+₹24,500</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-card border">
          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white">!</div>
          <div className="mt-4 text-sm text-slate-600">Pending Rent</div>
          <div className="text-[48px] font-extrabold leading-none text-red-500">2</div>
          <div className="text-sm font-bold text-red-500 mt-2">-₹8,200</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border shadow-card p-5">
          <div className="flex justify-between mb-4"><h3 className="font-bold text-lg">Recent Bookings</h3><Link to="/bookings" className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-semibold">View all →</Link></div>
          <table className="w-full text-sm">
            <thead className="text-xs text-slate-500 bg-slate-50"><tr><th className="text-left p-2">ID</th><th className="text-left p-2">Tenant</th><th className="text-left p-2">Room</th><th className="text-left p-2">Status</th></tr></thead>
            <tbody>{bookings.slice(0,3).map(b=><tr key={b.id} className="border-t"><td className="p-2"><span className="bg-slate-200 px-2 py-1 rounded text-xs">{b.bookingId}</span></td><td className="p-2 font-medium">{b.tenantName}</td><td className="p-2">{b.roomNumber}</td><td className="p-2"><Badge>{b.status}</Badge></td></tr>)}</tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl border shadow-card p-5">
          <div className="flex justify-between mb-4"><h3 className="font-bold text-lg">Recent Payments</h3><Link to="/payments" className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-semibold">View all →</Link></div>
          <table className="w-full text-sm">
            <thead className="text-xs text-slate-500 bg-slate-50"><tr><th className="text-left p-2">ID</th><th className="text-left p-2">Tenant</th><th className="text-left p-2">Amount</th><th className="text-left p-2">Status</th></tr></thead>
            <tbody>{payments.slice(0,3).map(p=><tr key={p.id} className="border-t"><td className="p-2"><span className="bg-slate-200 px-2 py-1 rounded text-xs">{p.paymentId}</span></td><td className="p-2 font-medium">{p.tenantName}</td><td className="p-2">₹{p.amount}</td><td className="p-2"><Badge>{p.status}</Badge></td></tr>)}</tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-card p-5">
        <h3 className="font-bold mb-4">Monthly Revenue (Mocked)</h3>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyCollection}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="collected" fill="#2563eb" radius={[6,6,0,0]} />
              <Bar dataKey="pending" fill="#f59e0b" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
