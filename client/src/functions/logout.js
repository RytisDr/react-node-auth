import axios from "axios";
export default function logout(setIsAuth) {
  axios({
    url: "http://localhost:9090/api/users/logout",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      if (res.status === 200) {
        setIsAuth(false);
      }
    })
    .catch(function (error) {
      //setIsAuth(true); // change to true after fetch works
      console.log("could not log-out");
    });
}
