import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4004/api/',
  headers:{
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})


