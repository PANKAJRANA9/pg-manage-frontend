
export const rooms = [
  { id: 1, roomNumber: '101', type: 'Single', rentAmount: 5000, floor: 1, status: 'Available' },
  { id: 2, roomNumber: '102', type: 'Double', rentAmount: 7000, floor: 1, status: 'Occupied' },
  { id: 3, roomNumber: '103', type: 'Single', rentAmount: 5000, floor: 1, status: 'Available' },
  { id: 4, roomNumber: '104', type: 'Double', rentAmount: 7000, floor: 1, status: 'Available' },
  { id: 5, roomNumber: '105', type: 'Triple', rentAmount: 9000, floor: 1, status: 'Occupied' },
  { id: 6, roomNumber: '106', type: 'Single', rentAmount: 5500, floor: 2, status: 'Occupied' },
  { id: 7, roomNumber: '107', type: 'Double', rentAmount: 7500, floor: 2, status: 'Available' },
  { id: 8, roomNumber: '201', type: 'Single', rentAmount: 6000, floor: 2, status: 'Occupied' },
  { id: 9, roomNumber: '202', type: 'Double', rentAmount: 8000, floor: 2, status: 'Occupied' },
  { id: 10, roomNumber: '204', type: 'Triple', rentAmount: 9500, floor: 2, status: 'Occupied' },
];

export const tenants = [
  { id: 1, name: 'Rahul Mehra', email: 'rahul.mehra@email.com', phone: '9876543210', roomNumber: '102', joinDate: '2025-06-01', gender: 'Male' },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '8765432109', roomNumber: '105', joinDate: '2025-05-20', gender: 'Female' },
  { id: 3, name: 'Amit Nair', email: 'amit.nair@email.com', phone: '7654321098', roomNumber: '106', joinDate: '2025-05-15', gender: 'Male' },
  { id: 4, name: 'Sanya Kapoor', email: 'sanya.kapoor@email.com', phone: '6543210987', roomNumber: '201', joinDate: '2025-06-10', gender: 'Female' },
  { id: 5, name: 'Vikram Patel', email: 'vikram.patel@email.com', phone: '5432109876', roomNumber: '202', joinDate: '2025-05-05', gender: 'Male' },
  { id: 6, name: 'Neha Singh', email: 'neha.singh@email.com', phone: '4321098765', roomNumber: '204', joinDate: '2025-06-12', gender: 'Female' },
  { id: 7, name: 'Aarav Sharma', email: 'aarav.sharma@email.com', phone: '3210987654', roomNumber: '204', joinDate: '2025-04-18', gender: 'Male' },
  { id: 8, name: 'Kavya Singh', email: 'kavya.singh@email.com', phone: '2109876543', roomNumber: '202', joinDate: '2025-04-20', gender: 'Female' },
];

export const bookings = [
  { id: 1, bookingId: 'BK-1001', tenantName: 'Aarav Sharma', roomNumber: 'R-204', checkIn: '2024-10-20', checkOut: '2025-04-20', status: 'Confirmed', monthlyRent: 4000 },
  { id: 2, bookingId: 'BK-1002', tenantName: 'Priya Mehta', roomNumber: 'R-101', checkIn: '2024-10-18', checkOut: '2025-04-18', status: 'Pending', monthlyRent: 4200 },
  { id: 3, bookingId: 'BK-1003', tenantName: 'Rahul Verma', roomNumber: 'R-107', checkIn: '2024-10-15', checkOut: '2025-04-15', status: 'Confirmed', monthlyRent: 3800 },
  { id: 4, bookingId: 'BK-1004', tenantName: 'Rahul Mehra', roomNumber: '102', checkIn: '2025-06-01', checkOut: '2025-12-01', status: 'Active', monthlyRent: 8500 },
  { id: 5, bookingId: 'BK-1005', tenantName: 'Amit Nair', roomNumber: '106', checkIn: '2025-05-15', checkOut: '2025-11-15', status: 'Active', monthlyRent: 9000 },
];

export const payments = [
  { id: 1, paymentId: 'PAY-5001', tenantName: 'Rahul Mehra', email: 'rahul.mehra@email.com', month: 'Oct 2025', amount: 8500, dueDate: '2025-10-05', status: 'Paid', initials: 'RM', color: '#2563eb' },
  { id: 2, paymentId: 'PAY-5002', tenantName: 'Priya Sharma', email: 'priya.sharma@email.com', month: 'Oct 2025', amount: 7200, dueDate: '2025-10-05', status: 'Pending', initials: 'PS', color: '#ec4899' },
  { id: 3, paymentId: 'PAY-5003', tenantName: 'Amit Nair', email: 'amit.nair@email.com', month: 'Sep 2025', amount: 9000, dueDate: '2025-09-30', status: 'Overdue', initials: 'AN', color: '#7c3aed' },
  { id: 4, paymentId: 'PAY-5004', tenantName: 'Sanya Kapoor', email: 'sanya.kapoor@email.com', month: 'Oct 2025', amount: 5500, dueDate: '2025-10-05', status: 'Paid', initials: 'SK', color: '#0d9488' },
  { id: 5, paymentId: 'PAY-5005', tenantName: 'Vikram Patel', email: 'vikram.patel@email.com', month: 'Sep 2025', amount: 6800, dueDate: '2025-09-30', status: 'Overdue', initials: 'VP', color: '#f59e0b' },
  { id: 6, paymentId: 'PAY-5006', tenantName: 'Neha Singh', email: 'neha.singh@email.com', month: 'Oct 2025', amount: 5500, dueDate: '2025-10-05', status: 'Pending', initials: 'NS', color: '#06b6d4' },
];

export const complaints = [
  { id: 1, tenantName: 'Rahul Kumar', subject: 'Water Leakage', status: 'Open', priority: 'High', date: '2025-06-01' },
  { id: 2, tenantName: 'Priya Sharma', subject: 'Fan Not Working', status: 'In Progress', priority: 'Medium', date: '2025-06-02' },
  { id: 3, tenantName: 'Amit Singh', subject: 'Room Cleaning', status: 'Resolved', priority: 'Low', date: '2025-06-03' },
];

export const monthlyCollection = [
  { month: 'Jun', collected: 35000, pending: 8000 },
  { month: 'Jul', collected: 38000, pending: 6500 },
  { month: 'Aug', collected: 42000, pending: 4000 },
  { month: 'Sep', collected: 39000, pending: 7200 },
  { month: 'Oct', collected: 42500, pending: 9000 },
];
