import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import NotFound from './pages/NotFound'
import AuthLayout from './layout/AuthLayout'
import { AdminRoute } from './components/common/AdminRoute'
import AddProduct from './pages/admin/AddProduct'
import DashBoard from './pages/admin/DashBoard'
import DashBoardLayout from './layout/DashBoardLayout'
import AdminProducts from './pages/admin/AdminProduct'
import Products from './pages/product/Products'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import AdminOrders from './pages/admin/AdminOrders'
import AdminHelp from './pages/admin/AdminHelp'
import AdminCustomer from './pages/admin/AdminCustomer'
import AdminReports from './pages/admin/AdminReport'
import OrderReport from './pages/admin/Report/OrderReport'
import CustomerReport from './pages/admin/Report/CustomerReport'
import RevenueReport from './pages/admin/Report/RevenueReport'
import ProductReport from './pages/admin/Report/ProductReport'
import AdminSetting from './pages/admin/AdminSetting'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/product' element={<Products />} />
        </Route>
        <Route element={<DashBoardLayout />}>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/customers" element={<AdminCustomer />} />
            <Route path="/reports" element={<AdminReports />}>
              <Route path="orders" element={<OrderReport />} />
              <Route path="customers" element={<CustomerReport />} />
              <Route path="revenue" element={<RevenueReport />} />
              <Route path="products" element={<ProductReport />} />
            </Route>
            <Route path="/help" element={<AdminHelp />} />
            <Route path="/settings" element={<AdminSetting />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
