import axios, { AxiosInstance } from 'axios';

export const interceptors = (instance: AxiosInstance, token: string | null) => {
    instance.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNjgzOTc5MDc3LCJleHAiOjE2ODQwNjU0Nzd9.T0yH2euB2J0dRVa7ygzLRdvnR7ElhTUngUKymUw8RuE`;

            // config.headers.Authorization = `Bearer ${token}`;
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
