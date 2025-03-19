import type { Route } from "./+types/sign-in";
import SignIn from "../components/pages/sign-in/sign-in";
import { useAuth } from "~/contexts/auth";
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign in to your account" },
    { name: "description", content: "Sign in to access your account" },
  ];
}

export default function SignInPage() {
  return <SignIn />;
}
