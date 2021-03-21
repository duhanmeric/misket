import { useEffect, useRef, useContext, useState } from "react";
import AuthService from "../services/AuthService";
import { UserContext } from "../UserProvider";
import { Redirect } from "react-router-dom";

export default function Login() {
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (user) {
      setRedirect(`/dashboard/${user.username}`);
    }
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleReq = () => {
    AuthService.register({
      email: email.current.value,
      username: username.current.value,
      password: password.current.value,
    });
  };

  return (
    <div className="container w-75">
      <h1 className="register-title text-center mb-5">Sign In</h1>
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
      <div className="form-group mx-auto my-3" style={{ maxWidth: "300px" }}>
        <label htmlFor="username" className="mb-1">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          aria-describedby="registerUsername"
          placeholder="Enter username"
          ref={username}
          required
        />
      </div>
      <div className="form-group mx-auto" style={{ maxWidth: "300px" }}>
        <label htmlFor="password" className="mb-1">
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
          className="make-list-btn"
          onClick={() => handleReq()}
          style={{ maxWidth: "300px" }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
