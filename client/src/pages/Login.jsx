import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = ({ isAuth, setIsAuth }) => {
  useEffect(() => {
    if (isAuth) history.replace("/");
  });

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    if ((email, password)) {
      axios({
        method: "post",
        url: "http://localhost:9090/api/users/login",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
        },
      })
        .then(function (res) {
          if (res.status === 200) {
            console.log("logged-in");
            setIsAuth(true);
          }
        })
        .then(() => {
          history.replace("/profile");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setError("Invalid Data");
    }
  };

  return (
    <div className="container">
      <form method="POST">
        <input
          type="email"
          required
          defaultValue="me@me.com"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          required
          defaultValue="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button onClick={handleClick}>LOGIN</button>
      </form>
      <h2>{error}</h2>
      <Link to="/reset">Forgotten password?</Link>
    </div>
  );
};
export default Login;
