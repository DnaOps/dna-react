import { Axios, AxiosBeforeAuthored } from "./axios";

import { setCookie } from "../util/Cookie";

export const postAuthenticate = async (
	signInData,
	handleUserInfo,
	redirectHome
) => {
	try {
		const res = await AxiosBeforeAuthored.post("auth/authenticate", signInData);
		const userInfo = res.data.data.userInfoResponse;
		const jwt = res.data.data.tokenResponse.jwt;
		redirectHome();
		localStorage.setItem("Authorization", `Bearer ${jwt.accessToken}`);
		setCookie("refresh_token", jwt.refreshToken, { secure: true });
		handleUserInfo(userInfo);
	} catch (e) {
		alert("로그인 정보가 일치하지 않습니다.");
	}
};

export const getNaverLogin = async () => {
	const res = await Axios.get("/oauth2/authorization/naver");
	console.log("res: ", res);
};

export const getNotices = async (boardInfo, handleNotify, handlePinned) => {
	const { type, start, title, author, content } = boardInfo;

	let res = null;
	if (start == "") {
		if (title == "" && author == "" && content == "")
			res = await Axios.get(`/${type}Posts`);
		else if (title && content)
			res = await Axios.get(`/${type}Posts?title=${title}&content=${content}`);
		else if (title) res = await Axios.get(`/${type}Posts?title=${title}`);
		else if (author) res = await Axios.get(`/${type}Posts?author=${author}`);
		else if (content) res = await Axios.get(`/${type}Posts?content=${content}`);
	} else {
		if (title == "" && author == "" && content == "")
			res = await Axios.get(`/${type}Posts?start=${start}`);
		else if (title && content)
			res = await Axios.get(
				`/${type}Posts?start=${start}&title=${title}&content=${content}`
			);
		else if (title)
			res = await Axios.get(`/${type}Posts?start=${start}&title=${title}`);
		else if (author)
			res = await Axios.get(`/${type}Posts?start=${start}&author=${author}`);
		else if (content)
			res = await Axios.get(`/${type}Posts?start=${start}&content=${content}`);
	}

	if (type == "notice") {
		handleNotify(res.data.data.noticePost.list);
		handlePinned(res.data.data.pinnedNoticePost.list);
	} else {
		handleNotify(res.data.data.list);
	}
};

export const getSpecificNotify = async (
	type,
	id,
	start,
	handleNotifyInfo,
	handleComment
) => {
	const notifyRes = await Axios.get(`/${type}Posts/${id}`);
	console.log("res:", notifyRes);
	handleNotifyInfo(notifyRes.data.data);
	getNofityComments(type, id, start, handleComment);
};

export const getNofityComments = async (type, id, start, handleComment) => {
	const res = await Axios.get(`/${type}Posts/${id}/comments?start=${start}`);
	handleComment(res.data.data.list);
};

export const deleteNotify = async (type, id) => {
	const res = await Axios.delete(`${type}Posts/${id}`);
};

export const postNotifyComment = async (type, id, commentData, callBack) => {
	await Axios.post(`/${type}Posts/${id}/comments`, commentData);
	callBack();
};

export const postSignUp = async (signUpData) => {
	const res = await Axios.post("/auth/signUp", signUpData);
	console.log("res: ", res);
};

export const postLike = async (type, noticeId) => {
	const res = await Axios.post(`/${type}Posts/${noticeId}/like`);
	console.log("res:", res);
};

export const postNotify = async (type, postNotifyDTO, navigate) => {
	const res = await Axios.post(`/${type}Posts`, postNotifyDTO);
	console.log("res:", res);
	if (res.data.apiStatus.errorCodeMessage == "Okay") navigate();
};

export const putNotify = async (type, id, postNotifyDTO, navigate) => {
	const res = await Axios.put(`/${type}Posts/${id}`, postNotifyDTO);
	if (res.data.apiStatus.errorCodeMessage == "Okay") navigate();
};
