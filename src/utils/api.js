
import axios from 'axios';
import { roomsMock, tenantsMock, bookingsMock, paymentsMock, complaintsMock, loadMock, LS_KEYS } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('pg_token');
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res)=> res,
  (err)=>{
    if(err.response && err.response.status===401){
      localStorage.removeItem('pg_token');
      localStorage.removeItem('pg_user');
      if(window.location.pathname !== '/login'){
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

const delay = (ms=250)=> new Promise(r=> setTimeout(r, ms));

async function tryApi(fn, mockFn){
  try{
    const res = await fn();
    return res.data;
  }catch(e){
    console.warn('API fallback to mock:', e.message);
    await delay();
    return mockFn();
  }
}

export const authAPI = {
  login: async (email, password)=>{
    try{
      const res = await api.post('/auth/login', { email, password });
      return res.data;
    }catch{
      await delay(400);
      if((email==='admin@pgmanage.com' && password==='admin123') || email.includes('admin') || password.length>=3){
        return { token: 'mock-jwt-token-'+Date.now(), user: { name: 'John Doe', email, role: 'Admin' } };
      }
      throw new Error('Invalid credentials');
    }
  }
};

export const roomsAPI = {
  getAll: ()=> tryApi(()=> api.get('/rooms'), ()=> loadMock(LS_KEYS.rooms, roomsMock)),
  create: (data)=> tryApi(()=> api.post('/rooms', data), ()=>{
    const all = loadMock(LS_KEYS.rooms, roomsMock);
    const newRoom = { id: Date.now(), ...data, status: data.status||'Available' };
    const updated = [...all, newRoom];
    localStorage.setItem(LS_KEYS.rooms, JSON.stringify(updated));
    return newRoom;
  }),
  update: (id, data)=> tryApi(()=> api.put(`/rooms/${id}`, data), ()=>{
    const all = loadMock(LS_KEYS.rooms, roomsMock);
    const updated = all.map(r=> r.id==id ? {...r, ...data} : r);
    localStorage.setItem(LS_KEYS.rooms, JSON.stringify(updated));
    return updated.find(r=> r.id==id);
  }),
  delete: (id)=> tryApi(()=> api.delete(`/rooms/${id}`), ()=>{
    const all = loadMock(LS_KEYS.rooms, roomsMock);
    const updated = all.filter(r=> r.id!=id);
    localStorage.setItem(LS_KEYS.rooms, JSON.stringify(updated));
    return { success: true };
  })
};

export const tenantsAPI = {
  getAll: ()=> tryApi(()=> api.get('/tenants'), ()=> loadMock(LS_KEYS.tenants, tenantsMock)),
  create: (data)=> tryApi(()=> api.post('/tenants', data), ()=>{
    const all = loadMock(LS_KEYS.tenants, tenantsMock);
    const newT = { id: Date.now(), ...data };
    const updated = [...all, newT];
    localStorage.setItem(LS_KEYS.tenants, JSON.stringify(updated));
    return newT;
  }),
  update: (id, data)=> tryApi(()=> api.put(`/tenants/${id}`, data), ()=>{
    const all = loadMock(LS_KEYS.tenants, tenantsMock);
    const updated = all.map(t=> t.id==id ? {...t, ...data} : t);
    localStorage.setItem(LS_KEYS.tenants, JSON.stringify(updated));
    return updated.find(t=> t.id==id);
  }),
  delete: (id)=> tryApi(()=> api.delete(`/tenants/${id}`), ()=>{
    const all = loadMock(LS_KEYS.tenants, tenantsMock);
    const updated = all.filter(t=> t.id!=id);
    localStorage.setItem(LS_KEYS.tenants, JSON.stringify(updated));
    return { success: true };
  })
};

export const bookingsAPI = {
  getAll: ()=> tryApi(()=> api.get('/bookings'), ()=> loadMock(LS_KEYS.bookings, bookingsMock)),
  create: (data)=> tryApi(()=> api.post('/bookings', data), ()=>{
    const all = loadMock(LS_KEYS.bookings, bookingsMock);
    const newB = { id: Date.now(), bookingId: `BK-${1000+all.length+1}`, ...data };
    const updated = [...all, newB];
    localStorage.setItem(LS_KEYS.bookings, JSON.stringify(updated));
    return newB;
  }),
  update: (id, data)=> tryApi(()=> api.put(`/bookings/${id}`, data), ()=>{
    const all = loadMock(LS_KEYS.bookings, bookingsMock);
    const updated = all.map(b=> b.id==id ? {...b, ...data} : b);
    localStorage.setItem(LS_KEYS.bookings, JSON.stringify(updated));
    return updated.find(b=> b.id==id);
  }),
  delete: (id)=> tryApi(()=> api.delete(`/bookings/${id}`), ()=>{
    const all = loadMock(LS_KEYS.bookings, bookingsMock);
    const updated = all.filter(b=> b.id!=id);
    localStorage.setItem(LS_KEYS.bookings, JSON.stringify(updated));
    return { success: true };
  })
};

export const paymentsAPI = {
  getAll: ()=> tryApi(()=> api.get('/payments'), ()=> loadMock(LS_KEYS.payments, paymentsMock)),
  create: (data)=> tryApi(()=> api.post('/payments', data), ()=>{
    const all = loadMock(LS_KEYS.payments, paymentsMock);
    const newP = { id: Date.now(), paymentId: `PAY-${5000+all.length+1}`, initials: (data.tenantName||'NA').split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(), color: '#2563eb', ...data };
    const updated = [newP, ...all];
    localStorage.setItem(LS_KEYS.payments, JSON.stringify(updated));
    return newP;
  }),
  update: (id, data)=> tryApi(()=> api.put(`/payments/${id}`, data), ()=>{
    const all = loadMock(LS_KEYS.payments, paymentsMock);
    const updated = all.map(p=> p.id==id ? {...p, ...data} : p);
    localStorage.setItem(LS_KEYS.payments, JSON.stringify(updated));
    return updated.find(p=> p.id==id);
  }),
  delete: (id)=> tryApi(()=> api.delete(`/payments/${id}`), ()=>{
    const all = loadMock(LS_KEYS.payments, paymentsMock);
    const updated = all.filter(p=> p.id!=id);
    localStorage.setItem(LS_KEYS.payments, JSON.stringify(updated));
    return { success: true };
  })
};

export const complaintsAPI = {
  getAll: ()=> tryApi(()=> api.get('/complaints'), ()=> loadMock(LS_KEYS.complaints, complaintsMock)),
  create: (data)=> tryApi(()=> api.post('/complaints', data), ()=>{
    const all = loadMock(LS_KEYS.complaints, complaintsMock);
    const newC = { id: Date.now(), ...data };
    const updated = [...all, newC];
    localStorage.setItem(LS_KEYS.complaints, JSON.stringify(updated));
    return newC;
  }),
  update: (id, data)=> tryApi(()=> api.put(`/complaints/${id}`, data), ()=>{
    const all = loadMock(LS_KEYS.complaints, complaintsMock);
    const updated = all.map(c=> c.id==id ? {...c, ...data} : c);
    localStorage.setItem(LS_KEYS.complaints, JSON.stringify(updated));
    return updated.find(c=> c.id==id);
  }),
  delete: (id)=> tryApi(()=> api.delete(`/complaints/${id}`), ()=>{
    const all = loadMock(LS_KEYS.complaints, complaintsMock);
    const updated = all.filter(c=> c.id!=id);
    localStorage.setItem(LS_KEYS.complaints, JSON.stringify(updated));
    return { success: true };
  })
};

export default api;
