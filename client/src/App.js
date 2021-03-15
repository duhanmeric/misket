import "./App.css";
import Profile from "./components-task/Profile";
import Home from "./components-ui/Home";
import Login from "./components-ui/Login";
import Register from "./components-ui/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { useState, useEffect } from "react";
import Verification from "./components-ui/Verification";

const getTokenFromLS = () => {
  return localStorage.getItem("token");
};

const getUserFromLS = () => {
  const userLS = localStorage.getItem("user");
  return JSON.parse(userLS);
};

function App() {
  const [user, setUser] = useState(getUserFromLS);
  const [token, setToken] = useState(getTokenFromLS);

  // useEffect(() => {
  //   setUser(user);
  //   setToken(token);
  // }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/dashboard/:username" component={Profile} />
            <Route
              path="/verification/:confirmationTicket"
              component={Verification}
            />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
