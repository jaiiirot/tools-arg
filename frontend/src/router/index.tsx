import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleRoute } from './RoleRoute'
import { TerminalSpinner } from '@/atoms/Spinner'

const LoginPage    = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const ProductsPage  = lazy(() => import('@/pages/products/ProductsPage'))
const CoursesPage   = lazy(() => import('@/pages/courses/CoursesPage'))
const MarketplacePage = lazy(() => import('@/pages/marketplace/MarketplacePage'))
const AffiliateDashboardPage = lazy(() => import('@/pages/affiliate/AffiliateDashboardPage'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const UserManagerPage    = lazy(() => import('@/pages/admin/UserManagerPage'))
const OrderManagerPage   = lazy(() => import('@/pages/admin/OrderManagerPage'))

const Fallback = () => (
  <div className="h-screen flex items-center justify-center bg-terminal-bg">
    <TerminalSpinner label="Loading module..." />
  </div>
)

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forbidden" element={<div className="h-screen flex items-center justify-center bg-terminal-bg text-terminal-red font-mono">ACCESS DENIED</div>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard"   element={<DashboardPage />} />
            <Route path="/products"    element={<ProductsPage />} />
            <Route path="/courses"     element={<CoursesPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />

            <Route element={<RoleRoute allowedRoles={['root', 'affiliate']} />}>
              <Route path="/affiliate" element={<AffiliateDashboardPage />} />
            </Route>

            <Route element={<RoleRoute allowedRoles={['root']} />}>
              <Route path="/admin"            element={<AdminDashboardPage />} />
              <Route path="/admin/users"      element={<UserManagerPage />} />
              <Route path="/admin/orders"     element={<OrderManagerPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
