
import React from 'react';

export const Card = ({ children, className='', ...props }) => (
  <div className={`bg-white rounded-xl shadow-card border border-slate-100 ${className}`} {...props}>
    {children}
  </div>
);

export const StatCard = ({ title, value, subtitle, trend, icon, iconBg, valueColor }) => (
  <div className="bg-white rounded-[14px] p-5 shadow-card border border-slate-100 flex flex-col gap-2">
    <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center text-white text-xl ${iconBg}`}>
      {icon}
    </div>
    <div className="text-[14px] font-medium text-slate-600 mt-1">{title}</div>
    <div className={`text-[42px] font-extrabold leading-none tracking-tight ${valueColor||'text-slate-900'}`}>{value}</div>
    <div className="text-[13px] text-slate-500">{subtitle}</div>
    {trend && (
      <div className={`text-[13px] font-semibold flex items-center gap-1 ${trend.positive ? 'text-emerald-600' : 'text-red-500'}`}>
        <span>{trend.positive ? '↗' : '↘'} </span>{trend.text}
      </div>
    )}
  </div>
);

export const Badge = ({ children, variant='default' }) => {
  const map = {
    Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Confirmed: 'bg-emerald-500 text-white border-emerald-500',
    Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-orange-400 text-white border-orange-400',
    Open: 'bg-red-50 text-red-700 border-red-200',
    Occupied: 'bg-red-50 text-red-600 border-red-200',
    Overdue: 'bg-orange-100 text-orange-700 border-orange-200',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  };
  const cls = map[children] || map[variant] || 'bg-slate-100 text-slate-700 border-slate-200';
  // special handling for payment badges with dot
  if(['Paid','Pending','Overdue'].includes(children)){
    const dot = children==='Paid'? 'bg-emerald-600' : children==='Pending'? 'bg-red-500' : 'bg-orange-500';
    const bg = children==='Paid'? 'bg-emerald-100 text-emerald-800' : children==='Pending'? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700';
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold border ${bg}`}>
        <span className={`w-2.5 h-2.5 rounded-full ${dot}`}></span>{children}
      </span>
    )
  }
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border ${cls}`}>
      {children}
    </span>
  )
};

export const Button = ({ children, variant='primary', size='md', className='', ...props }) => {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg transition focus:outline-none disabled:opacity-50";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-sm" };
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
    secondary: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };
  return <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>{children}</button>
};

export const Modal = ({ open, onClose, title, children, footer }) => {
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">✕</button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
};
