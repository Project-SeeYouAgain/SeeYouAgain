import axios, { AxiosInstance } from 'axios';

function getCookie(name: string) {
    const cookie = document.cookie;

    const matches = cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const interceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        config => {
            // const token = getCookie('accessToken');
            const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzNTA3NjQ0LCJleHAiOjE2ODM1OTQwNDR9.74LakC51k7LRC91UpsWOmPsazhTXRnm6DTl0pj5kMS4';
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
