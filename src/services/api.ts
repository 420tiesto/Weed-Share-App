import axios from 'axios';
import { log } from '../utils/logger';
import { ACCESS_TOKEN } from '../utils/local-storage/keys';

const createAPI = () => {
    const apiHeader = {
        'Content-Type': 'application/json',
    };

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: apiHeader,
    });

    api.interceptors.request.use(async config => {
        let accessToken;
        try {
            accessToken = await localStorage.getItem(ACCESS_TOKEN);
        } catch (err) {
            log('Error getting access token', err);
        }

        if (accessToken && config.headers) {
            config.headers['x-access-token'] = accessToken;
        }
        return config;
    })

    return api;
};

export const authAPI = createAPI();

