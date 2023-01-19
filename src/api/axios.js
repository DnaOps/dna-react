import axios from "axios";

const accessToken = localStorage.getItem("Authorization");
console.log("access token ", accessToken);
export const AxiosBeforeAuthored = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": " application/json",
  },
});

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": " application/json",
    Authorization: accessToken,
  },
});
