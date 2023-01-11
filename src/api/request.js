import Axios from "./axios";

import { setCookie } from "../util/Cookie";

export const postAuthenticate = async (signInData) => {
  const res = await Axios.post("/authenticate", signInData);
  const jwt = res.data.data.jwt;
  console.log("jwt: ", jwt);
  localStorage.setItem("Authorization", jwt.accessToken);
  setCookie("refresh_token", jwt.refreshToken, { secure: true });
};
