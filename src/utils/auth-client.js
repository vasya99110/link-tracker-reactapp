import * as API from './API'
import axios from 'axios'

const localStorageKey = '__linktracker_token__'
const localRefreshKey = '__linktracker_refresh_token__'

function handleUserResponse ({ access_token, refresh_token }) {
  window.localStorage.setItem(localStorageKey, access_token)
  window.localStorage.setItem(localRefreshKey, refresh_token)
}

function handleUserLogout () {
  window.localStorage.removeItem(localStorageKey)
  window.localStorage.removeItem(localRefreshKey)
  window.localStorage.removeItem('current_user')
  // window.localStorage.removeItem('themeMode')
}

async function getUser () {
  const token = getToken()
  if (!token) {
    return Promise.resolve(null)
  }

  try {
    const user = await API.get('api/current-user')

    const userData = user.data.data
    return userData
  } catch (error) {
    logout()
    return false
  }
}

function login (username, password) {
  return axios.post(`${API.apiUrl}oauth/token`, {
    'username': username,
    'password': password,
    'grant_type': 'password',
    'client_id': '2',
    'client_secret': 'GNQleteWBf5I0QdXWfk40Il7WpuKa587qwJNGCoa',
    'scope': '',
  }).then((response) => {
    handleUserResponse(response.data)
    // console.log(response.data)
    return Promise.resolve(response)
    // window.location.reload()
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      alert(error.response.data.message)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('request error: ')
      console.dir(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      console.dir(error)
    }

    return Promise.reject()
  })
}

function logout () {
  handleUserLogout()
  return Promise.resolve('Logout')
}

function getToken () {
  return window.localStorage.getItem(localStorageKey)
}

export { login, logout, getToken, getUser, handleUserResponse }
