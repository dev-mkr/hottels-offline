import axios from "axios";
import { redirect } from "react-router-dom";
const BASE_URL = "https://edu-garage.com";

const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // whatever you want to do with the error
    if (error.response.status === 401) return redirect("/auth/login");
  }
);
export const axiosWithCredentials = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export default api;
