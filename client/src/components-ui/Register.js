import { useEffect, useRef } from "react";
import AuthService from "../services/AuthService";

export default function Login() {
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);

  const handleReq = () => {
    AuthService.register({
      email: email.current.value,
      username: username.current.value,
      password: password.current.value,
    });
  };

  return (
    <div className="container d-flex flex-column w-50">
      <div className="text-center mb-3">Register Page</div>
      <input type="text" placeholder="email" ref={email} />
      <input
        type="text"
        className="mt-3"
        placeholder="username"
        ref={username}
      />
      <input
        type="text"
        className="my-3"
        placeholder="password"
        ref={password}
      />
      <button className="btn btn-dark" onClick={() => handleReq()}>
        Register
      </button>
    </div>
  );
}
