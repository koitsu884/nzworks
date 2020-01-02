var axios = require('axios');
// const apiBaseURL = process.env.REACT_APP_API_URL;
const apiBaseURL = "api";

var axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if(error.response.status === 401 && !originalRequest._retry){
      originalRequest._retry = true;
      return axiosInstance.get('/auth/token')
              .then(res => {
                return axiosInstance(originalRequest);
              })
              .catch(tokenError => {
                return Promise.reject(tokenError);
              })
    }
    else {
      return Promise.reject(error);
    }
  }
)

module.exports = axiosInstance;