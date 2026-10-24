
// Mock data matching screenshot names - production style
export const roomsMock = [
  { id: 1, roomNumber: '101', type: 'Single', rentAmount: 5000, floor: 1, status: 'Available', capacity: 1 },
  { id: 2, roomNumber: '102', type: 'Double', rentAmount: 7000, floor: 1, status: 'Occupied', capacity: 2 },
  { id: 3, roomNumber: '103', type: 'Single', rentAmount: 5000, floor: 1, status: 'Available', capacity: 1 },
  { id: 4, roomNumber: '104', type: 'Double', rentAmount: 7000, floor: 1, status: 'Available', capacity: 2 },
  { id: 5, roomNumber: '105', type: 'Triple', rentAmount: 9000, floor: 1, status: 'Occupied', capacity: 3 },
  { id: 6, roomNumber: '106', type: 'Single', rentAmount: 5500, floor: 2, status: 'Occupied', capacity: 1 },
  { id: 7, roomNumber: '107', type: 'Double', rentAmount: 7500, floor: 2, status: 'Available', capacity: 2 },
  { id: 8, roomNumber: '201', type: 'Single', rentAmount: 6000, floor: 2, status: 'Occupied', capacity: 1 },
  { id: 9, roomNumber: '202', type: 'Double', rentAmount: 8000, floor: 2, status: 'Occupied', capacity: 2 },
  { id: 10, roomNumber: '204', type: 'Triple', rentAmount: 9500, floor: 2, status: 'Occupied', capacity: 3 },
];

export const tenantsMock = [
  { id: 1, name: 'Rahul Mehra', email: 'rahul.mehra@email.com', phone: '9876543210', roomNumber: '102', roomId: 2, joinDate: '2025-06-01', gender: 'Male', aadhar: '1234-5678-9012' },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '8765432109', roomNumber: '105', roomId: 5, joinDate: '2025-05-20', gender: 'Female', aadhar: '2345-6789-0123' },
  { id: 3, name: 'Amit Nair', email: 'amit.nair@email.com', phone: '7654321098', roomNumber: '106', roomId: 6, joinDate: '2025-05-15', gender: 'Male', aadhar: '3456-7890-1234' },
  { id: 4, name: 'Sanya Kapoor', email: 'sanya.kapoor@email.com', phone: '6543210987', roomNumber: '201', roomId: 8, joinDate: '2025-06-10', gender: 'Female', aadhar: '4567-8901-2345' },
  { id: 5, name: 'Vikram Patel', email: 'vikram.patel@email.com', phone: '5432109876', roomNumber: '202', roomId: 9, joinDate: '2025-05-05', gender: 'Male', aadhar: '5678-9012-3456' },
  { id: 6, name: 'Neha Singh', email: 'neha.singh@email.com', phone: '4321098765', roomNumber: '204', roomId: 10, joinDate: '2025-06-12', gender: 'Female', aadhar: '6789-0123-4567' },
  { id: 7, name: 'Aarav Sharma', email: 'aarav.sharma@email.com', phone: '3210987654', roomNumber: '204', roomId: 10, joinDate: '2025-04-18', gender: 'Male', aadhar: '7890-1234-5678' },
  { id: 8, name: 'Kavya Singh', email: 'kavya.singh@email.com', phone: '2109876543', roomNumber: '202', roomId: 9, joinDate: '2025-04-20', gender: 'Female', aadhar: '8901-2345-6789' },
];

export const bookingsMock = [
  { id: 1, bookingId: 'BK-1001', tenantId: 7, tenantName: 'Aarav Sharma', roomNumber: 'R-204', roomId: 10, checkIn: '2024-10-20', checkOut: '2025-04-20', status: 'Confirmed', monthlyRent: 4000, dueDay: 5 },
  { id: 2, bookingId: 'BK-1002', tenantId: 2, tenantName: 'Priya Sharma', roomNumber: 'R-101', roomId: 1, checkIn: '2024-10-18', checkOut: '2025-04-18', status: 'Pending', monthlyRent: 4200, dueDay: 5 },
  { id: 3, bookingId: 'BK-1003', tenantId: 1, tenantName: 'Rahul Verma', roomNumber: 'R-107', roomId: 7, checkIn: '2024-10-15', checkOut: '2025-04-15', status: 'Confirmed', monthlyRent: 3800, dueDay: 5 },
  { id: 4, bookingId: 'BK-1004', tenantId: 1, tenantName: 'Rahul Mehra', roomNumber: '102', roomId: 2, checkIn: '2025-06-01', checkOut: '2025-12-01', status: 'Active', monthlyRent: 8500, dueDay: 5 },
  { id: 5, bookingId: 'BK-1005', tenantId: 3, tenantName: 'Amit Nair', roomNumber: '106', roomId: 6, checkIn: '2025-05-15', checkOut: '2025-11-15', status: 'Active', monthlyRent: 9000, dueDay: 30 },
  { id: 6, bookingId: 'BK-1006', tenantId: 4, tenantName: 'Sanya Kapoor', roomNumber: '201', roomId: 8, checkIn: '2025-06-10', checkOut: '2025-12-10', status: 'Active', monthlyRent: 5500, dueDay: 5 },
  { id: 7, bookingId: 'BK-1007', tenantId: 5, tenantName: 'Vikram Patel', roomNumber: '202', roomId: 9, checkIn: '2025-05-05', checkOut: '2025-11-05', status: 'Active', monthlyRent: 6800, dueDay: 30 },
  { id: 8, bookingId: 'BK-1008', tenantId: 6, tenantName: 'Neha Singh', roomNumber: '204', roomId: 10, checkIn: '2025-06-12', checkOut: '2025-12-12', status: 'Active', monthlyRent: 5500, dueDay: 5 },
];

export const complaintsMock = [
  { id: 1, tenantName: 'Rahul Kumar', subject: 'Water Leakage', description: 'Leakage in bathroom', status: 'Open', priority: 'High', createdAt: '2025-06-01' },
  { id: 2, tenantName: 'Priya Sharma', subject: 'Fan Not Working', description: 'Ceiling fan not working in room 102', status: 'In Progress', priority: 'Medium', createdAt: '2025-06-02' },
  { id: 3, tenantName: 'Amit Singh', subject: 'Room Cleaning', description: 'Room needs cleaning', status: 'Resolved', priority: 'Low', createdAt: '2025-06-03' },
  { id: 4, tenantName: 'Sneha Patel', subject: 'WiFi Issue', description: 'Internet not working', status: 'Open', priority: 'High', createdAt: '2025-06-04' },
  { id: 5, tenantName: 'Rohit Yadav', subject: 'AC Repair', description: 'AC not cooling', status: 'In Progress', priority: 'High', createdAt: '2025-06-05' },
  { id: 6, tenantName: 'Neha Singh', subject: 'Electrical Issue', description: 'Lights flickering', status: 'Open', priority: 'Medium', createdAt: '2025-06-06' },
];

export const paymentsMock = [
  { id: 1, paymentId: 'PAY-5001', tenantId: 1, tenantName: 'Rahul Mehra', email: 'rahul.mehra@email.com', month: 'Oct 2025', amount: 8500, dueDate: '2025-10-05', paidDate: '2025-10-04', status: 'Paid', paymentMode: 'UPI', transactionRef: 'UPI123456', bookingId: 4, initials: 'RM', color: '#2563eb' },
  { id: 2, paymentId: 'PAY-5002', tenantId: 2, tenantName: 'Priya Sharma', email: 'priya.sharma@email.com', month: 'Oct 2025', amount: 7200, dueDate: '2025-10-05', paidDate: null, status: 'Pending', paymentMode: 'BANK_TRANSFER', transactionRef: '', bookingId: 4, initials: 'PS', color: '#ec4899' },
  { id: 3, paymentId: 'PAY-5003', tenantId: 3, tenantName: 'Amit Nair', email: 'amit.nair@email.com', month: 'Sep 2025', amount: 9000, dueDate: '2025-09-30', paidDate: null, status: 'Overdue', paymentMode: 'CASH', transactionRef: '', bookingId: 5, initials: 'AN', color: '#7c3aed' },
  { id: 4, paymentId: 'PAY-5004', tenantId: 4, tenantName: 'Sanya Kapoor', email: 'sanya.kapoor@email.com', month: 'Oct 2025', amount: 5500, dueDate: '2025-10-05', paidDate: '2025-10-03', status: 'Paid', paymentMode: 'UPI', transactionRef: 'UPI654321', bookingId: 6, initials: 'SK', color: '#0d9488' },
  { id: 5, paymentId: 'PAY-5005', tenantId: 5, tenantName: 'Vikram Patel', email: 'vikram.patel@email.com', month: 'Sep 2025', amount: 6800, dueDate: '2025-09-30', paidDate: null, status: 'Overdue', paymentMode: 'BANK_TRANSFER', transactionRef: '', bookingId: 7, initials: 'VP', color: '#f59e0b' },
  { id: 6, paymentId: 'PAY-5006', tenantId: 6, tenantName: 'Neha Singh', email: 'neha.singh@email.com', month: 'Oct 2025', amount: 5500, dueDate: '2025-10-05', paidDate: null, status: 'Pending', paymentMode: 'CASH', transactionRef: '', bookingId: 8, initials: 'NS', color: '#06b6d4' },
  { id: 7, paymentId: 'PAY-5007', tenantId: 7, tenantName: 'Aarav Sharma', email: 'aarav.sharma@email.com', month: 'Oct 2024', amount: 4000, dueDate: '2024-10-05', paidDate: '2024-10-21', status: 'Paid', paymentMode: 'UPI', transactionRef: 'UPI777001', bookingId: 1, initials: 'AS', color: '#2563eb' },
  { id: 8, paymentId: 'PAY-5008', tenantId: 8, tenantName: 'Kavya Singh', email: 'kavya.singh@email.com', month: 'Oct 2024', amount: 4200, dueDate: '2024-10-05', paidDate: '2024-10-19', status: 'Paid', paymentMode: 'BANK_TRANSFER', transactionRef: 'TXN4200', bookingId: 2, initials: 'KS', color: '#ec4899' },
  { id: 9, paymentId: 'PAY-5009', tenantId: 1, tenantName: 'Vikram Joshi', email: 'vikram.joshi@email.com', month: 'Oct 2024', amount: 3800, dueDate: '2024-10-05', paidDate: null, status: 'Pending', paymentMode: 'CASH', transactionRef: '', bookingId: 3, initials: 'VJ', color: '#7c3aed' },
  { id: 10, paymentId: 'PAY-5010', tenantId: 2, tenantName: 'Rahul Kumar', email: 'rahul.kumar@email.com', month: 'Jun 2025', amount: 5000, dueDate: '2025-06-05', paidDate: '2025-06-04', status: 'Paid', paymentMode: 'UPI', transactionRef: 'UPI5010', bookingId: 4, initials: 'RK', color: '#0d9488' },
  { id: 11, paymentId: 'PAY-5011', tenantId: 3, tenantName: 'Priya Mehta', email: 'priya.mehta@email.com', month: 'Jun 2025', amount: 7000, dueDate: '2025-06-05', paidDate: '2025-06-05', status: 'Paid', paymentMode: 'CASH', transactionRef: '', bookingId: 5, initials: 'PM', color: '#f59e0b' },
  { id: 12, paymentId: 'PAY-5012', tenantId: 4, tenantName: 'Sneha Patel', email: 'sneha.patel@email.com', month: 'May 2025', amount: 9000, dueDate: '2025-05-05', paidDate: '2025-05-03', status: 'Paid', paymentMode: 'BANK_TRANSFER', transactionRef: 'BANK9000', bookingId: 6, initials: 'SP', color: '#06b6d4' },
  { id: 13, paymentId: 'PAY-5013', tenantId: 1, tenantName: 'Rahul Mehra', email: 'rahul.mehra@email.com', month: 'Nov 2024', amount: 8500, dueDate: '2024-11-05', paidDate: '2024-11-03', status: 'Paid', paymentMode: 'UPI', transactionRef: 'TXN5013', bookingId: 4, initials: 'RM', color: '#2563eb' },
  { id: 14, paymentId: 'PAY-5014', tenantId: 2, tenantName: 'Priya Sharma', email: 'priya.sharma@email.com', month: 'Dec 2024', amount: 7200, dueDate: '2024-12-05', paidDate: null, status: 'Pending', paymentMode: 'CASH', transactionRef: '', bookingId: 4, initials: 'PS', color: '#ec4899' },
  { id: 15, paymentId: 'PAY-5015', tenantId: 3, tenantName: 'Amit Nair', email: 'amit.nair@email.com', month: 'Jan 2025', amount: 9000, dueDate: '2025-01-05', paidDate: null, status: 'Overdue', paymentMode: 'BANK_TRANSFER', transactionRef: '', bookingId: 5, initials: 'AN', color: '#7c3aed' },
  { id: 16, paymentId: 'PAY-5016', tenantId: 4, tenantName: 'Sanya Kapoor', email: 'sanya.kapoor@email.com', month: 'Feb 2025', amount: 5500, dueDate: '2025-02-05', paidDate: '2025-02-03', status: 'Paid', paymentMode: 'UPI', transactionRef: 'TXN5016', bookingId: 6, initials: 'SK', color: '#0d9488' },
  { id: 17, paymentId: 'PAY-5017', tenantId: 5, tenantName: 'Vikram Patel', email: 'vikram.patel@email.com', month: 'Mar 2025', amount: 6800, dueDate: '2025-03-05', paidDate: null, status: 'Overdue', paymentMode: 'CASH', transactionRef: '', bookingId: 7, initials: 'VP', color: '#f59e0b' },
  { id: 18, paymentId: 'PAY-5018', tenantId: 6, tenantName: 'Neha Singh', email: 'neha.singh@email.com', month: 'Apr 2025', amount: 5500, dueDate: '2025-04-05', paidDate: null, status: 'Pending', paymentMode: 'BANK_TRANSFER', transactionRef: '', bookingId: 8, initials: 'NS', color: '#06b6d4' },
  { id: 19, paymentId: 'PAY-5019', tenantId: 1, tenantName: 'Rahul Mehra', email: 'rahul.mehra@email.com', month: 'Jul 2025', amount: 8500, dueDate: '2025-07-05', paidDate: '2025-07-04', status: 'Paid', paymentMode: 'UPI', transactionRef: 'TXN5019', bookingId: 4, initials: 'RM', color: '#2563eb' },
  { id: 20, paymentId: 'PAY-5020', tenantId: 2, tenantName: 'Priya Sharma', email: 'priya.sharma@email.com', month: 'Aug 2025', amount: 7200, dueDate: '2025-08-05', paidDate: '2025-08-04', status: 'Paid', paymentMode: 'BANK_TRANSFER', transactionRef: 'TXN5020', bookingId: 4, initials: 'PS', color: '#ec4899' },
  { id: 21, paymentId: 'PAY-5021', tenantId: 3, tenantName: 'Amit Nair', email: 'amit.nair@email.com', month: 'Sep 2025', amount: 9000, dueDate: '2025-09-05', paidDate: '2025-09-04', status: 'Paid', paymentMode: 'CASH', transactionRef: 'TXN5021', bookingId: 5, initials: 'AN', color: '#7c3aed' },
  { id: 22, paymentId: 'PAY-5022', tenantId: 4, tenantName: 'Sanya Kapoor', email: 'sanya.kapoor@email.com', month: 'Oct 2025', amount: 5500, dueDate: '2025-10-05', paidDate: null, status: 'Pending', paymentMode: 'UPI', transactionRef: '', bookingId: 6, initials: 'SK', color: '#0d9488' },
  { id: 23, paymentId: 'PAY-5023', tenantId: 5, tenantName: 'Vikram Patel', email: 'vikram.patel@email.com', month: 'Oct 2025', amount: 6800, dueDate: '2025-10-05', paidDate: '2025-10-05', status: 'Paid', paymentMode: 'BANK_TRANSFER', transactionRef: 'TXN5023', bookingId: 7, initials: 'VP', color: '#f59e0b' },
  { id: 24, paymentId: 'PAY-5024', tenantId: 6, tenantName: 'Neha Singh', email: 'neha.singh@email.com', month: 'Oct 2025', amount: 5500, dueDate: '2025-10-05', paidDate: '2025-10-06', status: 'Paid', paymentMode: 'CASH', transactionRef: 'TXN5024', bookingId: 8, initials: 'NS', color: '#06b6d4' },
];

export const dashboardStats = {
  monthlyCollection: [
    { month: 'Jun', collected: 35000, pending: 8000 },
    { month: 'Jul', collected: 38000, pending: 6500 },
    { month: 'Aug', collected: 42000, pending: 4000 },
    { month: 'Sep', collected: 39000, pending: 7200 },
    { month: 'Oct', collected: 42500, pending: 9000 },
    { month: 'Nov', collected: 41000, pending: 5500 },
  ]
};

export const LS_KEYS = {
  rooms: 'pg_rooms',
  tenants: 'pg_tenants',
  bookings: 'pg_bookings',
  payments: 'pg_payments',
  complaints: 'pg_complaints'
};

export function loadMock(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    if(raw){
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      // If corrupted (object, string, etc), clear and return fallback
      console.warn(`Corrupted localStorage for ${key}, resetting`);
      localStorage.removeItem(key);
      return fallback;
    }
  }catch(e){
    console.warn(`loadMock error for ${key}`, e);
  }
  return Array.isArray(fallback) ? fallback : [];
}
export function saveMock(key, data){
  try{ localStorage.setItem(key, JSON.stringify(data)); }catch{}
}
export function resetAll(){
  Object.values(LS_KEYS).forEach(k=> localStorage.removeItem(k));
  location.reload();
}
