import { useEffect, useRef, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserProvider";
import { Redirect } from "react-router-dom";

export default function Login() {
  const email = useRef(null);
  const password = useRef(null);
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (user) {
      console.log(user);
      setRedirect(`/dashboard/${user.username}`);
    }
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleReq = async () => {
    const res = await axios.post("http://localhost:5000/api/login", {
      userEmail: email.current.value,
      userPassword: password.current.value,
    });
    console.log(res.data.token, res.data.user);
    if (res.data.user.isActive) {
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
  };

  // contexte user'ı ver handlereq'ten sonra

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
