import { atom } from "recoil";

export default userInfo = atom({
  key: "userInfo",
  default: {
    username: "",
    authorization: "",
    postCount: 0,
    commentCount: 0,
    joinedDate: "2023. 1. 11",
  },
});
