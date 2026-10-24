
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login(){
  const [email,setEmail]=useState('admin@pgmanage.com');
  const [pass,setPass]=useState('admin123');
  const nav=useNavigate();
  const submit=(e)=>{
    e.preventDefault();
    localStorage.setItem('token','mock-poc-token');
    nav('/dashboard');
  };
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <form onSubmit={submit} className="w-full max-w-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl mb-6">🏢</div>
          <h1 className="text-2xl font-extrabold">PG Management System</h1>
          <p className="text-sm text-slate-500 mt-1">POC - 100% Mocked Data - No Backend</p>
          <div className="mt-8 space-y-4">
            <div><label className="label">Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /></div>
            <div><label className="label">Password</label><input type="password" className="input" value={pass} onChange={e=>setPass(e.target.value)} /></div>
            <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold">Login</button>
            <div className="text-xs text-slate-500 text-center">Demo: admin@pgmanage.com / admin123<br/>100% Frontend Mock - Client POC</div>
          </div>
        </form>
      </div>
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-indigo-800 p-12 text-white flex-col justify-between">
        <div></div>
        <div>
          <h2 className="text-4xl font-extrabold leading-tight">Better Management<br/>for a Better Stay</h2>
          <p className="mt-4 text-blue-100">Finance-first PG Management POC - All data mocked in frontend code</p>
        </div>
        <div className="text-xs text-blue-200">POC Version - No Backend Needed</div>
      </div>
    </div>
  );
}
