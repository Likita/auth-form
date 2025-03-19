import type { Route } from "./+types/forgot-password";
import { ForgotPassword } from "../components/pages/forgot-password/forgot-password";
import { useAuth } from "~/contexts/auth";
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Forgot Password" },
    { name: "description", content: "Forgot Password form" },
  ];
}

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
