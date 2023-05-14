import axios, { AxiosInstance } from 'axios';

export const interceptors = (instance: AxiosInstance, token: string | null) => {
    instance.interceptors.request.use(
        config => {
<<<<<<< HEAD
            const tokens = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjg0MDQ0NDk2LCJleHAiOjE2ODQxMzA4OTZ9.YsH3WsbVkbCngu-AIZHhPPdKSnoOk4YX936_7xitkFg';
            config.headers.Authorization = `Bearer ${tokens}`;
=======
            // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNjg0MDcxODUxLCJleHAiOjE2ODQxNTgyNTF9.Kn24LA1eVuZOTClH-bvTPUef7GxXi0oyrWvFWdaDF4I';
            config.headers.Authorization = `Bearer ${token}`;
>>>>>>> 5452869705df4ac6a37c7a3bf44fb8bb7c84dfde

            return config;
        },
        error => Promise.reject(error.response),
    );
    return instance;
};

const BASE_URL = 'https://k8c101.p.ssafy.io';
// const BASE_URL = 'http://localhost:8000';

const axiosApi = (url: string, token: string | null, options?: object) => {
    const instance = axios.create({ baseURL: url, ...options });
    interceptors(instance, token);
    return instance;
};

const axiosAuthApi = (url: string, token: string | null, options?: object) => {
    const instance = axios.create({ baseURL: url, ...options });
    interceptors(instance, token);
    return instance;
};

export const axBase = (token: string | null) => axiosApi(BASE_URL, token);
export const axAuth = (token: string | null) => axiosAuthApi(BASE_URL, token);
