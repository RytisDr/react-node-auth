import axios from "axios";

export default function authenticate(setIsAuth) {
  axios({
    url: "http://localhost:9090/api/users/auth-check",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        setIsAuth(true);
      }
    })
    .catch((err) => {
      setIsAuth(false);
    });
}
