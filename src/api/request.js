import Axios from "./axios";

import { setCookie } from "../util/Cookie";

export const postAuthenticate = async (signInData) => {
  const res = await Axios.post("/authenticate", signInData);
  const jwt = res.data.data.jwt;
  console.log("jwt: ", jwt);
  localStorage.setItem("Authorization", jwt.accessToken);
  setCookie("refresh_token", jwt.refreshToken, { secure: true });
};

export const getNotices = async (boardInfo) => {
  const { start, offset, criteria, keyword } = boardInfo;
  let res = null;
  if (start === "" || offset === "") {
    res = await Axios.get(`/boards/notices`);
  } else if (criteria === "" || keyword === "") {
    res = await Axios.get(`/boards/notices?start=${start}&offset=${offset}`);
  } else {
    res = await Axios.get(
      `/boards/notices?start=${start}&offset=${offset}&criteria=${criteria}&keyword=${keyword}`
    );
  }
  console.log("res: ", res);
};

export const postSignUp = async (signUpData) => {
  const res = await Axios.post("/auth/signUp", signUpData);
  console.log("res: ", res);
};
