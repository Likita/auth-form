import { useAuth } from "~/contexts/auth";
import "./home.css";
import { Button } from "~/components/atoms/button/button";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome, {user?.name}!</h1>
      <p>You are now signed in.</p>
      <Button 
        variant="secondary"
        onClick={logout}
        size="md"
      >
        Sign out
      </Button>
    </div>
  );
}
