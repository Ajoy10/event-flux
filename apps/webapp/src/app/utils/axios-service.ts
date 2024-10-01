import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000', // TODO: Set it from env var
  timeout: 10000, // 10s
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., logging, showing notifications)
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default axiosApi;
