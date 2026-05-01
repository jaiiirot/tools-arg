import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "./RoleRoute";
import { Spinner } from "@/components/atoms/Spinner"; // Ruta correcta al componente
import { TmuxLayout } from "@/components/templates/TmuxLayout";
import { AuthLayout } from "@/components/templates/AuthLayout";

// 1. IMPORTACIONES EXACTAS SEGÚN TU SCRIPT BASH (Sin sufijo "Page" y sin extensión ".tsx")
const Landing = lazy(() => import("@/pages/Landing"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Products = lazy(() => import("@/pages/products/Products"));
const Courses = lazy(() => import("@/pages/courses/Courses"));
const Marketplace = lazy(() => import("@/pages/marketplace/Marketplace"));
const Affiliates = lazy(() => import("@/pages/affiliates/Affiliates"));
const Admin = lazy(() => import("@/pages/admin/Admin"));
const Forbidden = lazy(() => import("@/pages/Forbidden"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const fallback = (
  <div className="h-screen flex items-center justify-center bg-terminal-bg">
    <Spinner size="lg" />
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={fallback}>
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forbidden" element={<Forbidden />} />

          {/* RUTAS PRIVADAS (Protegidas por un Outlet) */}
          <Route
            element={
              <TmuxLayout>
                <Outlet />
              </TmuxLayout>
            }
          >
            <ProtectedRoute>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/marketplace" element={<Marketplace />} />
            </ProtectedRoute>
            {/* RUTAS PRIVADAS CON PROTECCIÓN DE ROL */}
            <RoleRoute roles={["root", "admin", "affiliate"]}>
              <Route
                element={
                  <AuthLayout>
                    <Outlet />
                  </AuthLayout>
                }
              >
                <Route path="/affiliates" element={<Affiliates />} />
              </Route>
            </RoleRoute>
            <RoleRoute roles={["root", "admin"]}>
              <Route
                element={
                  <AuthLayout>
                    <Outlet />
                  </AuthLayout>
                }
              >
                <Route path="/admin" element={<Admin />} />
              </Route>
            </RoleRoute>
          </Route>

          {/* RUTAS NO ENCONTRADAS (404) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

// Exportamos por defecto para mantener consistencia con Vite
export default AppRouter;
