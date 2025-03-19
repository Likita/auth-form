import { Outlet } from "react-router";
import LoginLayout from "../components/layouts/login/login";
import { Navigate } from "react-router";
import { useAuth } from "~/contexts/auth";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <LoginLayout>
      <Outlet />
    </LoginLayout>
  );
}
