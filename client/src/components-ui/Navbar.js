import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserProvider";

export default function Navbar() {
  const { user } = useContext(UserContext);
  return (
    <header className="fixed-top">
      <div className="brand">
        <Link to={"/"}>MISKET</Link>
      </div>

      {user ? (
        <div>
          <Link to={`/dashboard/${user.username}`}>Dashboard</Link>
        </div>
      ) : (
        <div className="nav-control">
          <div className="login-link">
            <Link to={"/login"}>Login</Link>
          </div>
          <div className="register-link">
            <Link to={"/register"}>Register</Link>
          </div>
        </div>
      )}
    </header>
  );
}
