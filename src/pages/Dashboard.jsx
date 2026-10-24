
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { roomsAPI, tenantsAPI, bookingsAPI, paymentsAPI } from '../utils/api.js';
import { dashboardStats } from '../utils/mockData.js';
import { Badge } from '../components/ui/index.jsx';

export default function Dashboard(){
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      setLoading(true);
      const [r,t,b,p] = await Promise.all([roomsAPI.getAll(), tenantsAPI.getAll(), bookingsAPI.getAll(), paymentsAPI.getAll()]);
      setRooms(r); setTenants(t); setBookings(b); setPayments(p);
      setLoading(false);
    })();
  },[]);

  const safePayments = Array.isArray(payments) ? payments : [];
  const paidCount = safePayments.filter(x=>x.status==='Paid').slice(0,6).length;
  const pendingRent = safePayments.filter(x=>x.status!=='Paid').length;

  if(loading){
    return <div className="space-y-4"><div className="h-32 bg-white rounded-xl animate-pulse"></div><div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i=><div key={i} className="h-32 bg-white rounded-xl animate-pulse"></div>)}</div></div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[36px] font-extrabold text-slate-900 leading-none tracking-tight">Finance Overview</h1>
          <p className="text-[14px] text-slate-600 mt-2">PG Management System • Finance-first Dashboard • Updated Oct 24, 2024</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input placeholder="Search..." className="w-48 pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-sm bg-white" />
            <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
          </div>
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center relative">
            🔔<span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>
          <img src="https://i.pravatar.cc/100?img=32" className="w-9 h-9 rounded-full object-cover" alt="avatar" />
        </div>
      </div>

      {/* Metric cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-[14px] p-6 shadow-card border border-slate-100">
          <div className="w-12 h-12 bg-blue-600 rounded-[10px] flex items-center justify-center text-white text-2xl">🏢</div>
          <div className="text-[15px] font-medium text-slate-700 mt-4">Total Rooms</div>
          <div className="text-[56px] font-extrabold leading-none mt-2 text-slate-900">{rooms.length||10}</div>
          <div className="text-[13px] text-slate-600 mt-3">Active rooms</div>
          <div className="text-[13px] font-semibold text-emerald-600 mt-1">↗ +1 this month</div>
        </div>

        <div className="bg-white rounded-[14px] p-6 shadow-card border border-slate-100">
          <div className="w-12 h-12 bg-[#7c5cf0] rounded-[10px] flex items-center justify-center text-white text-2xl">👥</div>
          <div className="text-[15px] font-medium text-slate-700 mt-4">Total Tenants</div>
          <div className="text-[56px] font-extrabold leading-none mt-2 text-slate-900">{tenants.length||8}</div>
          <div className="text-[13px] text-slate-600 mt-3">Occupied</div>
          <div className="text-[13px] text-slate-500 mt-1">4 male • 4 female</div>
        </div>

        <div className="bg-white rounded-[14px] p-6 shadow-card border border-slate-100">
          <div className="w-12 h-12 bg-emerald-600 rounded-[10px] flex items-center justify-center text-white text-xl">$</div>
          <div className="text-[15px] font-medium text-slate-700 mt-4">Paid Rent</div>
          <div className="text-[56px] font-extrabold leading-none mt-2 text-emerald-600">6</div>
          <div className="text-[13px] text-slate-600 mt-3">Collected this month</div>
          <div className="text-[14px] font-semibold text-emerald-600 mt-1">+₹24,500</div>
        </div>

        <div className="bg-white rounded-[14px] p-6 shadow-card border border-slate-100">
          <div className="w-12 h-12 bg-red-500 rounded-[10px] flex items-center justify-center text-white text-2xl">!</div>
          <div className="text-[15px] font-medium text-slate-700 mt-4">Pending Rent</div>
          <div className="text-[56px] font-extrabold leading-none mt-2 text-red-500">2</div>
          <div className="text-[13px] text-slate-600 mt-3">Overdue</div>
          <div className="text-[14px] font-semibold text-red-500 mt-1">-₹8,200</div>
        </div>
      </div>

      {/* Middle: bookings and payments + chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[22px] font-bold text-slate-900">Recent Bookings</h3>
                <Link to="/bookings" className="text-[13px] font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">View all →</Link>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead className="bg-[#f8fafc] text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    <tr><th className="text-left px-3 py-2.5">Booking ID</th><th className="text-left px-3 py-2.5">Tenant</th><th className="text-left px-3 py-2.5">Room</th><th className="text-left px-3 py-2.5">Date</th><th className="text-left px-3 py-2.5">Status</th></tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(bookings)?bookings:[]).slice(0,3).map(b=>(
                      <tr key={b.id} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-3 py-3"><span className="bg-slate-300 text-slate-800 px-2.5 py-1 rounded text-[12px] font-medium">{b.bookingId}</span></td>
                        <td className="px-3 py-3 font-medium text-slate-800">{b.tenantName}</td>
                        <td className="px-3 py-3">{b.roomNumber}</td>
                        <td className="px-3 py-3 text-slate-600">{new Date(b.checkIn).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</td>
                        <td className="px-3 py-3"><Badge>{b.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[22px] font-bold text-slate-900">Recent Payments</h3>
                <Link to="/payments" className="text-[13px] font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">View all →</Link>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead className="bg-[#f8fafc] text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    <tr><th className="text-left px-3 py-2.5">Payment ID</th><th className="text-left px-3 py-2.5">Tenant</th><th className="text-left px-3 py-2.5">Amount</th><th className="text-left px-3 py-2.5">Date</th><th className="text-left px-3 py-2.5">Status</th></tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(payments)?payments:[]).slice(0,3).map(p=>(
                      <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-3 py-3"><span className="bg-slate-300 text-slate-800 px-2.5 py-1 rounded text-[12px] font-medium">{p.paymentId}</span></td>
                        <td className="px-3 py-3 font-medium text-slate-800">{p.tenantName}</td>
                        <td className="px-3 py-3">₹{p.amount.toLocaleString()}</td>
                        <td className="px-3 py-3 text-slate-600">{new Date(p.paidDate||p.dueDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</td>
                        <td className="px-3 py-3"><Badge>{p.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Monthly collection chart */}
          <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 mb-4">Monthly Revenue Collection</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardStats.monthlyCollection}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
                  <XAxis dataKey="month" tick={{fontSize:12}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:12}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{borderRadius:10, border:'1px solid #e2e8f0'}} />
                  <Bar dataKey="collected" fill="#2563eb" radius={[6,6,0,0]} barSize={28} />
                  <Bar dataKey="pending" fill="#f59e0b" radius={[6,6,0,0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right column - quick stats / occupancy */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 mb-4">Room Occupancy</h3>
            <div className="space-y-3">
              {(Array.isArray(rooms)?rooms:[]).slice(0,6).map(r=>(
                <div key={r.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${r.status==='Available' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium">{r.roomNumber} - {r.type}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">₹{r.rentAmount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
            <h4 className="font-bold">Pro Tip</h4>
            <p className="text-sm text-blue-100 mt-2">Set auto-reminders for rent due dates to reduce pending payments by 40%.</p>
            <button className="mt-4 bg-white text-blue-700 text-xs font-bold px-3 py-2 rounded-lg">Configure Reminders</button>
          </div>
        </div>
      </div>
    </div>
  )
}
