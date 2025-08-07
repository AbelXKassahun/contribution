import apiClient from './client';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../config/apiConfig';

export const registeredEmployees = async () => {
    const response = await apiClient.get(API_ENDPOINTS.GET_REGISTERED_EMPLOYEES);
    return response.data;
};

export const GetRegisteredEmployees = () => {
    return useQuery({
        queryKey: ['registeredEmployees'],
        queryFn: registeredEmployees,
        staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
    });
};