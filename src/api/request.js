import { Axios, AxiosBeforeAuthored } from "./axios";

import { setCookie } from "../util/Cookie";

export const postAuthenticate = async (signInData, handleUserInfo) => {
  const res = await AxiosBeforeAuthored.post("auth/authenticate", signInData);
  const userInfo = res.data.data.userInfoResponse;
  const jwt = res.data.data.tokenResponse.jwt;
  localStorage.setItem("Authorization", `Bearer ${jwt.accessToken}`);
  setCookie("refresh_token", jwt.refreshToken, { secure: true });
  handleUserInfo(userInfo);
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
  getNofityComments(id, handleComment);
};

export const getNofityComments = async (id, handleComment) => {
  const res = await Axios.get(`/comments/notices/${id}`);
  handleComment(res.data.data.list);
};

export const deleteNotify = async (id) => {
  const res = await Axios.delete("/boards/notices", { data: { noticeId: id } });
  console.log("res: ", res);
};

export const postNotifyComment = async (commentData) => {
  const res = await Axios.post("/comments", commentData);
  console.log("res: ", res);
};

export const postSignUp = async (signUpData) => {
  const res = await Axios.post("/auth/signUp", signUpData);
  console.log("res: ", res);
};

export const getIfLiked = async (noticeId, handleLike) => {
  const res = await Axios.get(`/likes/notices/${noticeId}`);
  handleLike(res.data.data);
};

export const postLike = async (noticeId, handleLike) => {
  const res = await Axios.post(`/likes/notices/${noticeId}`);
  handleLike(res.data.data);
};
