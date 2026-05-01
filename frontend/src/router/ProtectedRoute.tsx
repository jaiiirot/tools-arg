import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/atoms/Spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
