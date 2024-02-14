import axios from "axios";

let intervalId = null;

const refresh = (refreshToken) => {
  intervalId = setInterval(() => {
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/refresh/",
        { refresh: refreshToken },
        {
          dataType: "json",
          contentType: "application/json",
        }
      )
      .then((response) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        localStorage.setItem("access", response.data.access);
        console.log(axios.defaults.headers.common);
      })
      .catch((err) => console.log(err));
  }, 10000);
};

export const refreshToken = () => {
  let accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return refresh(refreshToken);
};

export const abortRefeshToken = () => {
  if (intervalId) clearInterval(intervalId);
  delete axios.defaults.headers.common["Authorization"];
};
