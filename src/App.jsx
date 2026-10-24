
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

function Protected({children}){
  const token = localStorage.getItem('token');
  if(!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Protected><Layout /></Protected>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="complaints" element={<Complaints />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
