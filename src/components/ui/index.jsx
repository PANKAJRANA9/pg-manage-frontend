
import React from 'react';
export const Badge = ({children})=>{
  const map = {
    Paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Available: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Pending: 'bg-red-100 text-red-700 border-red-200',
    Overdue: 'bg-orange-100 text-orange-700 border-orange-200',
    Open: 'bg-red-100 text-red-700 border-red-200',
    'In Progress': 'bg-orange-100 text-orange-700 border-orange-200',
    Resolved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Occupied: 'bg-red-100 text-red-700 border-red-200',
  };
  const cls = map[children] || 'bg-slate-100 text-slate-700 border-slate-200';
  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}><span className="w-1.5 h-1.5 rounded-full bg-current"></span>{children}</span>;
};
export const Button = ({children, ...props})=> <button {...props} className={`px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 ${props.className||''}`}>{children}</button>;
export const Card = ({children, className=''})=> <div className={`bg-white rounded-xl border border-slate-100 shadow-card ${className}`}>{children}</div>;
export const Modal = ({open, onClose, title, children, footer})=>{
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl w-full max-w-lg mx-4 shadow-2xl">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">✕</button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-auto">{children}</div>
        {footer && <div className="px-6 py-4 border-t bg-slate-50 rounded-b-xl flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};
