import axios, { AxiosError } from "axios";
import { getRefreshToken } from "@/auth";
import { getGlobalNotifyHandler } from "@/context/NotifyContext";

// Create an Axios instance
const apiCaller = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiCaller.interceptors.request.use(
  (config) => {
    const accessToken = getRefreshToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiCaller.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const showError = getGlobalNotifyHandler();
    const message =
      error.message ||
      "Something went wrong. Please try again later.";
    showError(message);
    return Promise.reject(error);
  }
);

export default apiCaller;
