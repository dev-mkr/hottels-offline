import axios from "axios";
const BASE_URL = "https://edu-garage.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosWithCredentials = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
