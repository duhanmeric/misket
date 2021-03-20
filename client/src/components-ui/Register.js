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
    <div className="container d-flex flex-column w-50">
      <div className="text-center mb-3">Register Page</div>
      <input type="text" placeholder="email" ref={email} />
      <input
        type="text"
        className="mt-3"
        placeholder="username"
        ref={username}
        required
      />
      <input
        type="text"
        className="my-3"
        placeholder="password"
        ref={password}
        required
      />
      <button className="btn btn-dark" onClick={() => handleReq()}>
        Register
      </button>
    </div>
  );
}
