import axios, { AxiosInstance } from 'axios';

export const interceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        config => {
            // const token = localStorage.getItem('accessToken');
            const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjgzNTA0ODE1LCJleHAiOjE2ODM1OTEyMTV9.bfh2-iL0WefJ7e7Sso2A87GQqTQx26z1aS4LnTcqspY';
            // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjgzMTY2NjM3LCJleHAiOjE2ODMyNTMwMzd9.i3fakee1wZtH36sfdVMHHmpFv8L1ggJgnAPHjmR6zbU';
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        error => Promise.reject(error.response),
    );
    return instance;
};

const BASE_URL = 'http://k8c101.p.ssafy.io:8000'; // 메인서버

// const BASE_URL = 'http://localhost:8000'; // 테스트 로컬 서버

// 단순 get요청으로 인증값이 필요없는 경우
const axiosApi = (url: string, options?: object) => {
    const instance = axios.create({ baseURL: url, ...options });
    interceptors(instance);
    return instance;
};

// post, delete등 api요청 시 인증값이 필요한 경우
const axiosAuthApi = (url: string, options?: object) => {
    const instance = axios.create({ baseURL: url, ...options });
    interceptors(instance);
    return instance;
};

export const axBase = axiosApi(BASE_URL);
export const axAuth = axiosAuthApi(BASE_URL);
