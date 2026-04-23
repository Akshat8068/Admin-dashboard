import { lazy, Suspense } from 'react'
import {  Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import DashBoardLayout from './layout/DashBoardLayout'
import { AdminRoute } from './components/common/AdminRoute'
import { ProtectedRoute } from './components/common/ProtectedRoute'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Products = lazy(() => import('./pages/product/Products'))
const DashBoard = lazy(() => import('./pages/admin/DashBoard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProduct'))
const AddProduct = lazy(() => import('./pages/admin/AddProduct'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))
const AdminCustomer = lazy(() => import('./pages/admin/AdminCustomer'))
const AdminReports = lazy(() => import('./pages/admin/AdminReport'))
const OrderReport = lazy(() => import('./pages/admin/Report/OrderReport'))
const CustomerReport = lazy(() => import('./pages/admin/Report/CustomerReport'))
const RevenueReport = lazy(() => import('./pages/admin/Report/RevenueReport'))
const ProductReport = lazy(() => import('./pages/admin/Report/ProductReport'))
const AdminHelp = lazy(() => import('./pages/admin/AdminHelp'))
const AdminSetting = lazy(() => import('./pages/admin/AdminSetting'))
const DummyProduct = lazy(() => import('./pages/admin/DummyProduct'))

const App = () => {
  return (
      <Suspense fallback={<div className="flex items-center justify-center h-screen text-sm text-gray-400">Loading...</div>}>
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
              <Route path="/dummy-products" element={<DummyProduct />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
  )
}

export default App
