
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/rooms', label: 'Rooms', icon: '🏠' },
  { to: '/tenants', label: 'Tenants', icon: '👥' },
  { to: '/bookings', label: 'Bookings', icon: '📅' },
  { to: '/payments', label: 'Payments', icon: '💳' },
  { to: '/complaints', label: 'Complaints', icon: '🔧' },
];

export default function Layout(){
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-[#f6f7fb]">
      <aside className={`fixed inset-y-0 left-0 z-30 w-[260px] bg-[#151c2c] text-white flex flex-col transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl">🏢</div>
            <div>
              <div className="font-extrabold leading-none">PG Manage</div>
              <div className="text-xs text-slate-400">Management System</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1 mt-4">
          {nav.map(n=>(
            <NavLink key={n.to} to={n.to} className={({isActive})=>`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${isActive?'bg-[#2a3655] text-white font-semibold':'text-slate-400 hover:text-white hover:bg-[#1e293b]'}`}>
              <span>{n.icon}</span>{n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">JD</div>
            <div className="flex-1">
              <div className="text-sm font-semibold">John Doe</div>
              <div className="text-xs text-slate-400">Admin</div>
            </div>
          </div>
          <button onClick={()=>{localStorage.removeItem('token'); navigate('/login');}} className="mt-3 w-full text-xs text-slate-400 hover:text-white">Logout</button>
        </div>
      </aside>
      <div className="flex-1 lg:ml-[260px]">
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b px-4 py-3 flex items-center justify-between">
          <button onClick={()=>setOpen(!open)} className="p-2">☰</button>
          <span className="font-bold">PG Manage</span>
          <div className="w-8"></div>
        </header>
        <main className="p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
