import { useEffect, useRef } from "react";
import axios from "axios";

export default function Login() {
  const email = useRef(null);
  const password = useRef(null);

  // useEffect(() => {
  //   handleReq();
  // });

  const handleReq = async () => {
    await axios.post("http://localhost:5000/api/login", {
      userEmail: email.current.value,
      userPassword: password.current.value,
    });
  };

  return (
    <div className="container d-flex flex-column w-50">
      <div className="text-center mb-3">Login Page</div>
      <input type="text" placeholder="email" ref={email} />
      <input
        type="text"
        className="my-3"
        placeholder="password"
        ref={password}
      />
      <button className="btn btn-dark" onClick={() => handleReq()}>
        Login
      </button>
    </div>
  );
}
