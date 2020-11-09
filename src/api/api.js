import axios from 'axios';

const defaultOptions = {
  baseURL: 'http://93.86.249.163:3030',
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods':
      'POST, GET, DELETE, OPTIONS, REMOVE, UPDATE',
    'Content-Type': 'application/json',
  },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');

  config.headers['Authorization'] = token
    ? `Bearer ${JSON.parse(token)}`
    : null;

  return config;
});

export default instance;
