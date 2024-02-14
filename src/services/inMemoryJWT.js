// import axios from "axios";
// import { setAuthToken } from "../components/setAuthToken";

// const inMemoryJWTService = () => {
//   //   let inMemoryJWT = null;
//   let refreshTimeoutId = null;

//   const refreshToken = () => {
//     const timeoutTrigger = 4 * 60 * 1000;

//     refreshTimeoutId = setInterval(() => {
//       axios
//         .post("http://127.0.0.1:8000/api/v1/refresh/", localStorage.refresh)
//         .then((response) => {
//           //   setToken(response.data.access);
//           localStorage.removeItem("access");
//           localStorage.setItem("access", response.data.access);
//         });
//     }, timeoutTrigger);
//   };

//   const abortRefeshToken = () => {
//     if (refreshTimeoutId) clearInterval(refreshTimeoutId);
//   };

//   const getToken = () => {
//     // return inMemoryJWT;
//   };

//   const setToken = () => {
//     // inMemoryJWT = token;
//   };

//   const deleteToken = () => {
//     // inMemoryJWT = null;
//     localStorage.removeItem("id");
//     localStorage.removeItem("refresh");
//     abortRefeshToken();
//   };

//   return getToken, setToken, deleteToken;
// };
// export default inMemoryJWTService;
