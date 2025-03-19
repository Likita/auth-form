import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/contexts/auth";

export default function Auth() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
