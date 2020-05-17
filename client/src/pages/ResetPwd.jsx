import React, { useState } from "react";
import axios from "axios";
const Users = () => {
  const [email, setEmail] = useState(null);
  const [response, setResponse] = useState(null);
  function sendEmail() {
    axios({
      method: "post",
      url: "http://localhost:9090/api/users/recover",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email,
      },
    }).then((res) => {
      if (res.status === 200) {
        setResponse("Check your email.");
      } else {
        setResponse("Error, check your email and try again.");
        throw res;
      }
    });
  }
  return (
    <>
      <h1>A password reset request</h1>
      <form method="POST">
        <input
          type="email"
          placeholder="Your Email"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <button onClick={sendEmail}>Submit</button>
      </form>
      {response && <h2>{response}</h2>}
    </>
  );
};

export default Users;
