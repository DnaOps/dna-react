import { atom, selector } from "recoil";
import { postAuthenticate } from "../api/request";

export const UserInfoState = atom({
  key: "UserInfoState",
  default: {
    commentCount: 0,
    createdDate: "",
    likeCount: 0,
    postCount: 0,
    role: "",
    username: "",
  },
});

export const UserInfo = selector({
  key: "UserInfo",
  get: () => {},
  set: ({ set }, newValue) => {
    set(UserInfoState, newValue);
  },
});

export default UserInfoState;
