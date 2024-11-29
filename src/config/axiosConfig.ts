import { store } from "../store/store";
import axios from "axios";
import { logout, setToken } from "../store/slices/auth";
// import { API_URL, API_KEY } from '@env';

// console.log("asdasdsadsadasd",API_URL);
// console.log(API_KEY);

const serverUrl ='https://api.tibbit.garajcloud.com/'

export const api = axios.create({
  baseURL: serverUrl,
});
 
export const authApi = axios.create({
  baseURL: serverUrl,
});
 
authApi.interceptors.request.use(
  (request:any) => {
    return request;
  },
  (err:any) => {
    console.log("errorss",err);
    
    
    return Promise.reject(err);
  }
);
 

api.interceptors.request.use(
  (config:any) => {
    let authToken = store?.getState()?.user?.token;
    config.headers = {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    };
    return config;
  },
  (err:any) => {
    return Promise.reject(err);
  }
);
 
api.interceptors.response.use(
  (res:any) => {
    return res;
  },
  (err:any) => {
    if (err?.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);