import Axios from "./axios";

export const postAuthenticate = async (signInData) => {
  const res = await Axios.post("/authenticate", signInData);
  const jwt = res.data.data.jwt;
  console.log("jwt: ", jwt);
  localStorage.setItem("Authorization", jwt.accessToken);
  // set refresh token in cookie
};
