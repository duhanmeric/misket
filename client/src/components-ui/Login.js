import { useEffect, useRef, useContext, useState } from "react";
import { UserContext } from "../UserProvider";
import { Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import Navbar from "./Navbar";
import { decode } from "jsonwebtoken";

export default function Login() {
  const email = useRef(null);
  const password = useRef(null);
  const { token, setToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      const user = decode(token);
      setRedirect(`/dashboard/${user.username}`);
    }
  }, [token]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleReq = () => {
    AuthService.login({
      userEmail: email.current.value,
      userPassword: password.current.value,
    })
      .then((res) => {
        if (res.data.user.isActive) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        }
      })
      .catch(function (error) {
        if (error.response) {
          let cleanError = JSON.stringify(error.response.data.error);
          setError(cleanError);
        }
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="login">
        <div className="container w-75">
          <div className="login-content">
            <h1 className="login-title text-center mb-4">Login</h1>
            {error ? (
              <div style={{ color: "white" }} className="text-center mb-3">
                {error}
              </div>
            ) : null}
            <div className="form-group mx-auto" style={{ maxWidth: "300px" }}>
              <label htmlFor="email" className="mb-1">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="registerEmail"
                placeholder="Enter email"
                ref={email}
                required
              />
            </div>
            <div className="form-group mx-auto" style={{ maxWidth: "300px" }}>
              <label htmlFor="password" className="mb-1 mt-3">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                aria-describedby="registerPassword"
                placeholder="Enter password"
                ref={password}
                required
              />
            </div>
            <div className="btn-container d-flex justify-content-center mt-4">
              <button
                className="make-btn"
                onClick={() => handleReq()}
                style={{ maxWidth: "300px", border: "none", width: "100%" }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
