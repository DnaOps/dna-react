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

export const getNotices = async (boardInfo, inViewed) => {
	const { type, start, title, author, content } = boardInfo;

	let res = null;
	if (start == "") {
		if (title == "" && author == "" && content == "")
			res = await Axios.get(`/${type}Posts`);
		else if (title && content)
			res = await Axios.get(`/${type}Posts?title=${title}?content=${content}`);
		else if (title) res = await Axios.get(`/${type}Posts?title=${title}`);
		else if (author) res = await Axios.get(`/${type}Posts?author=${author}`);
		else if (content) res = await Axios.get(`/${type}Posts?content=${content}`);
	} else {
		if (title == "" && author == "" && content == "")
			res = await Axios.get(`/${type}Posts?start=${start}`);
		else if (title && content)
			res = await Axios.get(
				`/${type}Posts?start=${start}?title=${title}?content=${content}`
			);
		else if (title)
			res = await Axios.get(`/${type}Posts?start=${start}?title=${title}`);
		else if (author)
			res = await Axios.get(`/${type}Posts?start=${start}?author=${author}`);
		else if (content)
			res = await Axios.get(`/${type}Posts?start=${start}?content=${content}`);
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

export const postNotifyComment = async (commentData, callBack) => {
	await Axios.post("/comments", commentData);
	callBack();
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

export const postNotify = async (postNotifyDTO, navigate) => {
	const res = await Axios.post(`/forumPosts`, postNotifyDTO);
	if (res.data.apiStatus.errorCodeMessage == "Okay") navigate();
};
