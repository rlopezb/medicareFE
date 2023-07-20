import axios from 'axios';
import store from "../store/store";


const api = axios.create({
  baseURL: `http://localhost:8080/medicare/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
    config => {
      let user = store.getState().user;
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      } else {
        delete api.defaults.headers.common.Authorization;
      }
      return config;
    },
    error => Promise.reject(error)
);
export default api;