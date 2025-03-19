import type { Route } from "./+types/sign-up";
import SignUp from "../components/pages/sign-up/sign-up";
import { useAuth } from "~/contexts/auth";
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create your account" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function SignUpPage() {
  return <SignUp />;
}
