import axios from "axios";

const api = axios.create({
  baseURL: "https://siakad-api.onrender.com/api",
  //baseURL: "http://localhost:8080/api",
});

// REQUEST → inject token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE → handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/auth/login");
    }

    return Promise.reject(error);
  },
);

export default api;
