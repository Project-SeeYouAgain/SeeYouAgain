import axios, { AxiosInstance } from 'axios';

export const interceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        config => {
            const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjgzMTc0OTY1LCJleHAiOjE2ODMyNjEzNjV9.iZxorsBPyW235SoXpKUBzDETBUVgeIHE91k87FhKadU';
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        error => Promise.reject(error.response),
    );
    return instance;
};

const BASE_URL = 'http://k8c101.p.ssafy.io:8000';

const axiosApi = (url: string, options?: object) => {
    const instance = axios.create({ baseURL: url, ...options });
    return instance;
};

const axiosAuthApi = (url: string, options?: object) => {
    const instance = axios.create({ baseURL: url, ...options });
    interceptors(instance);
    return instance;
};

export const axBase = axiosApi(BASE_URL);
export const axAuth = axiosAuthApi(BASE_URL);
