import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code == 0) return res;

    return Promise.reject(new Error(res.msg || 'Error'));
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;
