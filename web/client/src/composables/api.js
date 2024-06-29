import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4004/api/',
  headers:{
    common: {
      Authorization: localStorage.getItem('token')
    }
  }
})


