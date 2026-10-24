
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Rooms from './pages/Rooms.jsx';
import Tenants from './pages/Tenants.jsx';
import Bookings from './pages/Bookings.jsx';
import Payments from './pages/Payments.jsx';
import Complaints from './pages/Complaints.jsx';

function Protected({ children }){
  const token = localStorage.getItem('pg_token');
  if(!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Navigate to="/dashboard" replace/>} />
        <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
        <Route path="/rooms" element={<Protected><Rooms/></Protected>} />
        <Route path="/tenants" element={<Protected><Tenants/></Protected>} />
        <Route path="/bookings" element={<Protected><Bookings/></Protected>} />
        <Route path="/payments" element={<Protected><Payments/></Protected>} />
        <Route path="/complaints" element={<Protected><Complaints/></Protected>} />
        <Route path="*" element={<Navigate to="/dashboard" replace/>} />
      </Routes>
    </BrowserRouter>
  )
}
