import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed-top w-100 d-flex justify-content-between">
      <div className="brand">
        <Link to={"/"}>MISKET</Link>
      </div>
      <div className="auth d-flex justify-content-between align-items-center">
        <div className="login-link">
          <Link to={"/login"}>Login</Link>
        </div>
        <div className="sign-up-link">
          <Link to={"/register"}>Sign Up</Link>
        </div>
      </div>
    </header>
  );
}
