import axios from 'axios'

const apiUrl = 'https://api.linktracker.pro/'
// const apiUrl = 'https://api.youngmekong.dev/'

function getInstance (...customConfig) {
  const token = window.localStorage.getItem('__linktracker_token__')
  /*if (!token) {
    return Promise.resolve(null)
  }*/

  const headers = { 'content-type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    baseURL: apiUrl,
    headers: headers,
    ...customConfig,
  }

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  const instance = axios.create(config)
  instance.interceptors.response.use(function (response) {
    // Do something before request is sent
    return response;
  }, function (error) {
    // Do something with request error
    /*if(error.response.status >= 400 && error.response.status < 500) {
      window.location.reload()
    }*/
    if(error.response.statusText === 'Unauthorized'
      || error.response.statusText === 'Too Many Attempts.') {
      window.location.reload()
    }

    return Promise.reject(error);
  });

  return instance
}

function get (endpoint, ...optional) {
  return getInstance().get(endpoint, ...optional)
}

function post (endpoint, data, ...config) {
  return getInstance().post(endpoint, data, ...config)
}

function put(endpoint, data, ...config) {
  return getInstance().put(endpoint, data, ...config)
}

function patch(endpoint, data, ...config) {
  return getInstance().patch(endpoint, data, ...config)
}

function deleteRequest(endpoint, ...config){
  return getInstance().delete(endpoint, ...config)
}

export { apiUrl, get, post, put, patch, deleteRequest }