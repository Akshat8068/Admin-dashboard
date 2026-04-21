// Mock data for AdminReport

export const revenueData8Days = [
    { date: '12 Aug', revenue: 8000, order: 4000 },
    { date: '13 Aug', revenue: 9500, order: 5000 },
    { date: '14 Aug', revenue: 8800, order: 4200 },
    { date: '15 Aug', revenue: 14521, order: 6000 },
    { date: '16 Aug', revenue: 11000, order: 5500 },
    { date: '17 Aug', revenue: 13000, order: 6200 },
    { date: '18 Aug', revenue: 12000, order: 5800 },
    { date: '19 Aug', revenue: 15000, order: 7000 },
];

export const revenueData30Days = [
    { date: 'Jul 20', revenue: 6000, order: 3000 },
    { date: 'Jul 25', revenue: 7500, order: 3800 },
    { date: 'Aug 1', revenue: 9000, order: 4500 },
    { date: 'Aug 5', revenue: 11000, order: 5200 },
    { date: 'Aug 10', revenue: 10500, order: 5000 },
    { date: 'Aug 15', revenue: 13000, order: 6100 },
    { date: 'Aug 19', revenue: 15000, order: 7000 },
];

export const revenueData3Months = [
    { date: 'May', revenue: 42000, order: 21000 },
    { date: 'Jun', revenue: 55000, order: 27000 },
    { date: 'Jul', revenue: 61000, order: 30000 },
    { date: 'Aug', revenue: 78000, order: 38000 },
];

export const revenueDataYear = [
    { date: 'Jan', revenue: 30000, order: 15000 },
    { date: 'Feb', revenue: 38000, order: 18000 },
    { date: 'Mar', revenue: 45000, order: 22000 },
    { date: 'Apr', revenue: 42000, order: 20000 },
    { date: 'May', revenue: 55000, order: 27000 },
    { date: 'Jun', revenue: 60000, order: 30000 },
    { date: 'Jul', revenue: 58000, order: 29000 },
    { date: 'Aug', revenue: 78000, order: 38000 },
    { date: 'Sep', revenue: 72000, order: 35000 },
    { date: 'Oct', revenue: 85000, order: 42000 },
    { date: 'Nov', revenue: 91000, order: 45000 },
    { date: 'Dec', revenue: 110000, order: 55000 },
];

export const orderReportData = [
    { date: '12 Aug', orders: 320, completed: 280, cancelled: 40 },
    { date: '13 Aug', orders: 410, completed: 370, cancelled: 40 },
    { date: '14 Aug', orders: 380, completed: 340, cancelled: 40 },
    { date: '15 Aug', orders: 520, completed: 480, cancelled: 40 },
    { date: '16 Aug', orders: 460, completed: 420, cancelled: 40 },
    { date: '17 Aug', orders: 490, completed: 450, cancelled: 40 },
    { date: '18 Aug', orders: 430, completed: 390, cancelled: 40 },
    { date: '19 Aug', orders: 560, completed: 510, cancelled: 50 },
];

export const mockProductReportData = [
    { id: 'PRD-001', name: 'Wireless Headphones', price: 89.99, stock: 142, status: 'active', category: 'Electronics' },
    { id: 'PRD-002', name: 'Smart Watch Pro', price: 249.99, stock: 0, status: 'inactive', category: 'Electronics' },
    { id: 'PRD-003', name: 'USB-C Hub 7-in-1', price: 39.99, stock: 87, status: 'active', category: 'Accessories' },
    { id: 'PRD-004', name: 'Mechanical Keyboard', price: 129.99, stock: 34, status: 'active', category: 'Electronics' },
    { id: 'PRD-005', name: 'Laptop Stand Aluminum', price: 49.99, stock: 0, status: 'inactive', category: 'Accessories' },
    { id: 'PRD-006', name: 'Noise Cancelling Earbuds', price: 79.99, stock: 220, status: 'active', category: 'Electronics' },
    { id: 'PRD-007', name: 'Portable Charger 20000mAh', price: 34.99, stock: 310, status: 'active', category: 'Accessories' },
    { id: 'PRD-008', name: 'Webcam 4K', price: 119.99, stock: 55, status: 'active', category: 'Electronics' },
    { id: 'PRD-009', name: 'Gaming Mouse RGB', price: 59.99, stock: 0, status: 'inactive', category: 'Electronics' },
    { id: 'PRD-010', name: 'Monitor 27" 4K', price: 499.99, stock: 18, status: 'active', category: 'Electronics' },
];

export const mockCustomerReportData = [
    { id: 'CUS-001', name: 'Alice Johnson', email: 'alice@example.com', orders: 12, totalSpent: 1240.50, status: 'active', joined: 'Jan 2024' },
    { id: 'CUS-002', name: 'Bob Smith', email: 'bob@example.com', orders: 5, totalSpent: 430.00, status: 'active', joined: 'Mar 2024' },
    { id: 'CUS-003', name: 'Carol White', email: 'carol@example.com', orders: 23, totalSpent: 3120.75, status: 'active', joined: 'Nov 2023' },
    { id: 'CUS-004', name: 'David Brown', email: 'david@example.com', orders: 1, totalSpent: 89.99, status: 'inactive', joined: 'Jul 2024' },
    { id: 'CUS-005', name: 'Eva Martinez', email: 'eva@example.com', orders: 8, totalSpent: 780.20, status: 'active', joined: 'Feb 2024' },
    { id: 'CUS-006', name: 'Frank Lee', email: 'frank@example.com', orders: 15, totalSpent: 2100.00, status: 'active', joined: 'Dec 2023' },
    { id: 'CUS-007', name: 'Grace Kim', email: 'grace@example.com', orders: 3, totalSpent: 210.50, status: 'inactive', joined: 'Aug 2024' },
    { id: 'CUS-008', name: 'Henry Wilson', email: 'henry@example.com', orders: 19, totalSpent: 2890.00, status: 'active', joined: 'Oct 2023' },
];

export const customerGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 180 },
    { month: 'Mar', users: 240 },
    { month: 'Apr', users: 210 },
    { month: 'May', users: 310 },
    { month: 'Jun', users: 390 },
    { month: 'Jul', users: 350 },
    { month: 'Aug', users: 480 },
    { month: 'Sep', users: 520 },
    { month: 'Oct', users: 610 },
    { month: 'Nov', users: 700 },
    { month: 'Dec', users: 850 },
];
