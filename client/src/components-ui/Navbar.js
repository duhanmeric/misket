import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserProvider";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [theme, setTheme] = useState("light");
  const handleTheme = (value) => {
    switch (value) {
      case 0:
        setTheme("dark"); // dark
        break;
      case 1:
        setTheme("light"); // light
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log("run use effect");
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <header className="fixed-top w-100 d-flex justify-content-between">
      <div className="brand">
        <Link to={"/"}>MISKET</Link>
      </div>

      <div className="auth d-flex justify-content-between align-items-center">
        {theme === "light" ? (
          <div className="dark-btn" onClick={() => handleTheme(0)}>
            <i className="far fa-moon"></i>
          </div>
        ) : (
          <div className="light-btn" onClick={() => handleTheme(1)}>
            <i className="far fa-sun"></i>
          </div>
        )}

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
