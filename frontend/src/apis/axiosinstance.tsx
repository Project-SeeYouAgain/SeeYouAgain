import axios, { AxiosInstance } from 'axios';

export const interceptors = (instance: AxiosInstance, token: string | null) => {
    instance.interceptors.request.use(
        config => {
            const tokens = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjg0MzY5NDQwLCJleHAiOjE2ODQ0NTU4NDB9.tZABfLU-8p_CQJK8IpftBennHl60U9-nVKSDxovlhvo';

            config.headers.Authorization = `Bearer ${tokens}`;
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
