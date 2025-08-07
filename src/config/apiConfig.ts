export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5555';

export const API_ENDPOINTS = {
    // GET_REGISTERED_EMPLOYEES: `${BASE_URL}/auth/login`,
    GET_REGISTERED_EMPLOYEES: 'get-registered-employees', // 'api/contribution/registered-employees'
    GET_UNREGISTERED_EMPLOYEES: 'get-unregistered-employees', // 'api/contribution/registered-employees'

};