"use client";
import { message } from "antd";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:8080";
const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    if (error.response?.data?.status !== 200) {
      message.error(`${error.response?.data?.error}`);
    }
    return Promise.reject(error);
  }
);

export default request;
