import axios, { AxiosError } from "axios";
import { unauthorized } from 'next/navigation'
import { getAccessToken } from "@/cookie";
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
    const accessToken = getAccessToken();
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
      error.response?.data?.message ||
      "Something went wrong. Please try again later.";

    showError(message);

    if (error.response?.status === 401) unauthorized();

    return Promise.reject(error);
  }
);

export default apiCaller;
