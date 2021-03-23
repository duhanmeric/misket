import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserProvider";

export default function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <header className="fixed-top w-100 d-flex justify-content-between">
      <div className="brand">
        <Link to={"/"}>MISKET</Link>
      </div>

      <div className="auth d-flex justify-content-between align-items-center">
        {user ? (
          <div className="profile-link">
            <Link to={`/dashboard/${user.username}`}>Dashboard</Link>
          </div>
        ) : (
          <>
            <div className="login-link">
              <Link to={"/login"}>Login</Link>
            </div>
            <div className="sign-up-link">
              <Link to={"/register"}>Sign Up</Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
