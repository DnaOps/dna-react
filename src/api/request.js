import { Axios, AxiosBeforeAuthored } from "./axios";
import { setCookie } from "../util/Cookie";

export const postAuthenticate = async (
	signInData,
	handleUserInfo,
	redirectHome
) => {
	const res = await AxiosBeforeAuthored.post("auth/authenticate", signInData);
	if (res.data.apiStatus.errorCode != "Y000") {
		if (res.data.apiStatus.errorCode == "N206") {
			alert("관리자로부터 회원가입 승인 전입니다. \n관리자에게 문의해주세요.");
			return;
		}
		alert("로그인 정보가 일치하지 않습니다.");
		return;
	}
	const userInfo = res.data.data.userInfoResponse;
	const jwt = res.data.data.tokenResponse.jwt;
	redirectHome();
	localStorage.setItem("Authorization", `Bearer ${jwt.accessToken}`);
	setCookie("refresh_token", jwt.refreshToken, { secure: true });
	handleUserInfo(userInfo);
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
		console.log("album res:", res);
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
	handleNotifyInfo(notifyRes.data.data);
	getNofityComments(type, id, start, handleComment);
};

export const postSignUp = async (signUpData) => {
	const res = await Axios.post("/auth/signUp", signUpData);
	if (res.data.apiStatus.errorCode == "Y000") {
		alert(
			"회원가입 요청되었습니다.\n관리자가 승인하면 드나의 모든 페이지를 이용할 수 있습니다."
		);
	} else {
		alert("회원가입에 실패했습니다.");
	}
};

export const postSocialSignUp = async (signUpData) => {
	const res = await Axios.post("/auth/signUp/oauth", signUpData);
	console.log("res:", res);
	if (res.data.apiStatus.errorCode == "Y000") {
		alert(
			"회원가입 요청되었습니다.\n관리자가 승인하면 드나의 모든 페이지를 이용할 수 있습니다."
		);
	} else {
		alert("회원가입에 실패했습니다.");
	}
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

export const getNofityComments = async (type, id, start, handleComment) => {
	const res = await Axios.get(`/${type}Posts/${id}/comments?start=${start}`);
	console.log("Res", res);
	handleComment(res.data.data.list);
};

export const postNotifyComment = async (type, id, commentData, callBack) => {
	await Axios.post(`/${type}Posts/${id}/comments`, commentData);
	callBack();
};

export const deleteNotify = async (type, id) => {
	const res = await Axios.delete(`${type}Posts/${id}`);
};

export const putNotifyComment = async (
	type,
	id,
	commentId,
	commentData,
	callBack
) => {
	const res = await Axios.put(
		`/${type}Posts/${id}/comments/${commentId}`,
		commentData
	);
	callBack();
	console.log("resModify:", res);
};

export const deleteNofityComment = async (
	type,
	id,
	commentId,
	commentData,
	callBack
) => {
	const res = await Axios.delete(
		`/${type}Posts/${id}/comments/${commentId}`,
		commentData
	);
	callBack();
	console.log("res:", res);
};

export const getUnverifiedUsers = async (handleReqeust) => {
	const res = await Axios.get("auth/unverifiedUsers");
	handleReqeust(res.data.data);
};

export const postVerifyUser = async (userId) => {
	await Axios.post(`auth/unverifiedUsers/${userId}`);
};
