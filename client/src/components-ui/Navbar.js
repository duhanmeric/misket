import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserProvider";

export default function Navbar() {
  const { user } = useContext(UserContext);

  const handleBar = () => {
    let item = document.querySelector(".nav-menu");
    item.classList.toggle("opened");
    console.log(item);
  };

  return (
    <header className="fixed-top">
      <div className="brand">
        <Link to={"/"}>MISKET</Link>
      </div>
      <nav>
        <div className="bar" onClick={() => handleBar()}>
          <i className="fas fa-bars"></i>
        </div>
        <div className="nav-menu">
          {user ? (
            <div className="dashboard-link">
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
        </div>
      </nav>
    </header>
  );
}
