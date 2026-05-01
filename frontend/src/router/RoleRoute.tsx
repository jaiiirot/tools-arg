import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import type { UserRole } from "@/types/api";

export function RoleRoute({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: UserRole[];
}) {
  const role = useAuthStore((s) => s.role);
  if (!role || !roles.includes(role))
    return <Navigate to="/forbidden" replace />;
  return <>{children}</>;
}
