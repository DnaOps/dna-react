import axios from "axios";

const accessToken = localStorage.getItem("Authorization");
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
