import axios, { AxiosError, AxiosRequestConfig } from "axios";
import baseApiUrl from "./BaseApiUrl";

const $http = axios.create({
  baseURL: baseApiUrl,
});

const handleError = (error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    if (error.code !== "200" && error.code !== "201") {
      throw error.response?.data;
    }
  }else {
    throw {
        error: {
          message: "Error de peticion",
        },
    }
  }
};

$http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return handleError(error);
  }
);

$http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    
  },
  (error) => Promise.reject(error)
  // Do something with request error
);

export default $http;
