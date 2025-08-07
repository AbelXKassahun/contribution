import apiClient from './client';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../config/apiConfig';

export const unregisteredEmployees = async () => {
    const response = await apiClient.get(API_ENDPOINTS.GET_UNREGISTERED_EMPLOYEES);
    return response.data;
};

export const GetUnregisteredEmployees = () => {
    return useQuery({
        queryKey: ['unregisteredEmployees'],
        queryFn: unregisteredEmployees,
        staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
    });
};