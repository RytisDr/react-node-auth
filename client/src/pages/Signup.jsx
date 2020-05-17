import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [signedUp, setSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    if ((email, password, repeatPassword && password === repeatPassword)) {
      axios({
        method: "post",
        url: "http://localhost:9090/api/users/register",
        withCredentials: true,
        data: {
          email,
          password,
        },
      })
        .then(function (response) {
          console.log(response);
          setSignUp(true); // changing hook state
          history.push("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setError("Invalid Data");
    }
  };

  return (
    <div>
      {signedUp ? (
        <h1>User Created</h1>
      ) : (
        <div className="container">
          <h1>Create the profile</h1>
          <p>.............</p>

          <form method="POST">
            <input
              type="email"
              placeholder="Email"
              name="email"
              //required
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Password"
              name="password"
              //required
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              //required
              onChange={(event) => setRepeatPassword(event.target.value)}
            ></input>
            <button type="submit" onClick={handleClick}>
              CREATE
            </button>
          </form>
          {error ? <h2>{error}</h2> : null}
        </div>
      )}
    </div>
  );
};

export default Signup;
