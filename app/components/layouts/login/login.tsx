import { Outlet } from "react-router";
import "./login.css";

export default function LoginLayout() {
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
