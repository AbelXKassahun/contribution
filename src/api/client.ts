// src/api/client.ts
import axios from 'axios';

import { BASE_URL } from '../config/apiConfig';

const apiClient = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true,
});

export default apiClient;


/*
// how to use the wrapper

import apiClient from './client';

export const getUserInfo = () => apiClient.get('/user/info');
*/