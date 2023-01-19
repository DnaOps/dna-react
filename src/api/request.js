import { Axios, AxiosBeforeAuthored } from "./axios";

import { setCookie } from "../util/Cookie";

export const postAuthenticate = async (signInData) => {
  const res = await AxiosBeforeAuthored.post("auth/authenticate", signInData);
  console.log("res: ", res);
  const userInfo = res.data.data.userInfoResponse;
  const jwt = res.data.data.tokenResponse.jwt;
  localStorage.setItem("Authorization", `Bearer ${jwt.accessToken}`);
  setCookie("refresh_token", jwt.refreshToken, { secure: true });
  // set userinfo in state with recoil
};

export const getNaverLogin = async () => {
  const res = await Axios.get("/oauth2/authorization/naver");
  console.log("res: ", res);
};

export const getNotices = async (boardInfo, inViewed) => {
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
  const noticeList = res.data.data.list;
  inViewed(noticeList);
};

export const getSpecificNotify = async (
  id,
  handleNotifyInfo,
  handleComment
) => {
  const notifyRes = await Axios.get(`/boards/notices/${id}`);
  handleNotifyInfo(notifyRes.data.data);
  const commentRes = await Axios.get(`/comments/notices/${id}`);
  handleComment(commentRes.data.data.list);
};

export const getNofityComments = async (id, handleComment) => {
  const res = await Axios.get(`/comments/notices/${id}`);
  handleComment(res.data.data.list);
};
