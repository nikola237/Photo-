import axios from 'axios';

const defaultOptions = {
  baseURL: 'http://93.86.249.163:3030',
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'POST, GET, DELETE, OPTIONS, UPDATE',
    'Content-Type': 'application/json',
  },
  data: {
    data: {},
  },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');

  config.headers['Authorization'] = token ? `Bearer ${token}` : null;

  return config;
});

export default instance;
