import type { Route } from "./+types/home";
import Home from "../components/pages/home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Main page" },
    { name: "description", content: "Welcome!" },
  ];
}

export default function HomePage() {
  return <Home />;
}
