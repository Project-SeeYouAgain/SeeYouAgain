import axios, { AxiosInstance } from 'axios';

export const interceptors = (instance: AxiosInstance, token: string | null) => {
    instance.interceptors.request.use(
        config => {
            // config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNjgzNzkzMDEzLCJleHAiOjE2ODM4Nzk0MTN9.7OFJnT85xYpNCLtV-Ugbyl_DHoJhFiO7X1ZwVgGxG2c`;
            const tokens = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzNzkzNDgzLCJleHAiOjE2ODM4Nzk4ODN9.oEZu2HJ-Dm7KWc6W2OcxAHfvJwi3hU03L4Qv_c4kLCU';
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
