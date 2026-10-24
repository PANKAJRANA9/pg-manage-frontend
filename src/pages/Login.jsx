
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api.js';

export default function Login(){
  const [email, setEmail] = useState('admin@pgmanage.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true); setErr('');
    try{
      const data = await authAPI.login(email, password);
      localStorage.setItem('pg_token', data.token);
      localStorage.setItem('pg_user', JSON.stringify(data.user));
      navigate('/dashboard');
    }catch(ex){
      setErr(ex.message||'Login failed');
    }finally{ setLoading(false); }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-32">
        <div className="max-w-[420px] w-full mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl">🏠</div>
            <div>
              <div className="font-extrabold text-slate-900 text-xl leading-none">PG Management System</div>
              <div className="text-xs text-slate-500 mt-1">Login to your account</div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-8">Enter your credentials to access your PG dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email / Username</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">👤</span>
                <input className="input pl-10" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@pgmanage.com" required />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">🔒</span>
                <input className="input pl-10" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
            </div>

            {err && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">{err}</div>}

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm transition">
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-sm text-center text-slate-500">
              Don't have an account? <span className="text-blue-600 font-semibold cursor-pointer">Register</span>
            </div>

            <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <div className="font-semibold mb-1">Demo credentials:</div>
              <div>Email: <code className="bg-white px-1 rounded border">admin@pgmanage.com</code></div>
              <div>Password: <code className="bg-white px-1 rounded border">admin123</code></div>
              <div className="mt-1 text-[11px] text-slate-400">Any email + password ≥3 chars works in mock mode</div>
            </div>
          </form>
        </div>
      </div>

      {/* Right image */}
      <div className="hidden lg:flex flex-1 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/80"></div>
        {/* gradient placeholder mimicking PG room */}
        <div className="absolute inset-0">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.8) 100%), url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h2 className="text-3xl font-bold leading-tight">Better Management<br/>for a Better Stay</h2>
          <p className="text-sm text-slate-300 mt-3 max-w-sm">Simplify your PG operations with automated rent tracking, tenant management and finance-first dashboards.</p>
        </div>
      </div>
    </div>
  )
}
