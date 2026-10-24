
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const nav = [
  { path: '/dashboard', label: 'Dashboard', icon: '▤' }, // dashboard icon
  { path: '/rooms', label: 'Rooms', icon: '🚪' },
  { path: '/tenants', label: 'Tenants', icon: '👥' },
  { path: '/bookings', label: 'Bookings', icon: '📅' },
  { path: '/payments', label: 'Payments', icon: '💳' },
  { path: '/complaints', label: 'Complaints', icon: '⚠️' },
];

function IconWrap({children}){
  return <span className="w-6 h-6 flex items-center justify-center text-[18px]">{children}</span>
}

export default function Layout({ children }){
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('pg_user')||'{"name":"John Doe","role":"Admin"}');

  const logout = ()=>{
    localStorage.removeItem('pg_token');
    localStorage.removeItem('pg_user');
    navigate('/login');
  };

  const SidebarContent = () => (
    <>
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-2xl">🏢</div>
        <div>
          <div className="font-extrabold text-white text-[20px] leading-none">PG Manage</div>
          <div className="text-[12px] text-slate-400 mt-1 tracking-wide">Management System</div>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-6 space-y-1">
        {nav.map(item=>{
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({isActive})=>`flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium transition ${isActive ? 'bg-[#2e3a5e] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              onClick={()=>setOpen(false)}
            >
              <IconWrap>{item.icon}</IconWrap>
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#4a5a8a] flex items-center justify-center text-white font-bold text-sm">
            {(user.name||'JD').split(' ').map(s=>s[0]).join('').slice(0,2)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-semibold truncate">{user.name||'John Doe'}</div>
            <div className="text-slate-400 text-xs">{user.role||'Admin'}</div>
          </div>
          <button onClick={logout} className="text-slate-400 hover:text-white">⍈</button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[260px] bg-[#181f38] flex-col fixed h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="flex-1 bg-black/40" onClick={()=>setOpen(false)}></div>
          <div className="w-[280px] bg-[#181f38] flex flex-col">
            <SidebarContent/>
          </div>
        </div>
      )}

      <div className="flex-1 lg:ml-[260px] min-w-0">
        {/* topbar mobile */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button onClick={()=>setOpen(true)} className="p-2 rounded-lg border border-slate-200">☰</button>
          <div className="font-bold">PG Manage</div>
          <div className="w-8 h-8 rounded-full bg-slate-200"></div>
        </div>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
