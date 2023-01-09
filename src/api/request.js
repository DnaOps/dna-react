import Axios from "./axios";

export const getReq = (url, params) => {
  Axios.get(url, params)
    .then((res) => {
      console.log("res: ", res);
    })
    .catch((e) => {
      console.log("err: ", e);
    });
};

export const postReq = (url, params) => {
  Axios.post(url, params)
    .then((res) => {
      console.log("res: ", res);
    })
    .catch((e) => {
      console.log("err: ", e);
    });
};
