var axios = require('axios');
const apiBaseURL = process.env.REACT_APP_API_URL;

var axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true
});

module.exports = axiosInstance;