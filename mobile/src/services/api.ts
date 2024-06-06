import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.22.32.1:3333'
})