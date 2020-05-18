import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const ResetPwd = () => {
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [response, setResponse] = useState(null);
  let history = useHistory();
  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");
    const userId = params.get("id");
    setToken(token);
    setUserId(userId);
  }, []);
  const handleClick = (e) => {
    e.preventDefault();

    if (password === password2) {
      axios({
        method: "post",
        url: "http://localhost:9090/api/users/recovery",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { id: userId, token, password },
      })
        .then((res) => {
          if (res.status === 200) {
            history.replace("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setResponse("Passwords don't match");
    }
  };
  return (
    <>
      <h1>Create a new password</h1>
      <form method="post">
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
        />
        <input
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
          type="password"
          placeholder="Repeat the password"
        />
        <button onClick={(e) => handleClick(e)}>Submit</button>
      </form>
      <h2>{response}</h2>
    </>
  );
};

export default ResetPwd;
