import { api } from "./api";

api.interceptors.response.use(
  response => response,
  error => {
    console.log('rota interceptada')
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);