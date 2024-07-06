import { AppError } from '@utils/AppError';
import axios, { type AxiosInstance } from 'axios';

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
  baseURL: 'http://172.20.112.1:3333'
})as APIInstanceProps;


api.registerInterceptTokenManager = singOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => response, (error) => {
    if(error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
}

export { api }