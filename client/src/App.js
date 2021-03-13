import "./App.css";
import Profile from "./components-task/Profile";
import Home from "./components-ui/Home";
import Login from "./components-ui/Login";
import Register from "./components-ui/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/dashboard/:username" component={Profile} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
