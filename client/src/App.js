import "./App.css";
import Dashboard from "./components-task/Dashboard";
import Home from "./components-ui/Home";
import Login from "./components-ui/Login";
import Register from "./components-ui/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { useState } from "react";
import Verification from "./components-ui/Verification";
import Navbar from "./components-ui/Navbar";

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

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/dashboard/:username" component={Dashboard} />
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
