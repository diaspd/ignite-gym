import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.22.32.1:3333'
})

api.interceptors.request.use((reponse) => {
  return reponse;
}, (error) => {
  return Promise.reject(error);
})

export { api }