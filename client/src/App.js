import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import PrivateRoute from "./components/PrivateRoute";
import authenticate from "./functions/auth";
import logout from "./functions/logout";
import ResetPassword from "./pages/ResetPwd";
import ChangePwd from "./pages/ChangePwd";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    authenticate(setIsAuth);
  }, []);
  const toLogOut = () => {
    logout(setIsAuth);
  };
  return (
    <Router>
      <div className="App">
        <header>
          <Nav isAuth={isAuth} logout={toLogOut} />
        </header>
        <Switch>
          <Route exact path="/" component={(props) => <Home />}></Route>
          <Route path="/signup" component={(props) => <Signup />}></Route>
          <Route path="/reset" component={(props) => <ResetPassword />}></Route>
          <Route path="/recovery" component={(props) => <ChangePwd />}></Route>
          <Route
            path="/login"
            component={(...props) => (
              <Login isAuth={isAuth} setIsAuth={setIsAuth} />
            )}
          ></Route>
          <PrivateRoute
            isAuth={isAuth}
            path="/profile"
            component={(props) => <Profile />}
          ></PrivateRoute>
          <PrivateRoute
            isAuth={isAuth}
            path="/users"
            component={(props) => <Users />}
          ></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
