import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../urls/urls';
import { BackendUserSchema } from '../../constants/interfaces/user';
import ApiResponse from '../types/apiResponseType';

export const registerUser = async (data: BackendUserSchema): Promise<ApiResponse<BackendUserSchema>> => {
    const response = await axiosInstance.post(ENDPOINTS.REGISTER, data);
    if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
    }
    throw new Error(response.data.error || 'Failed to register user');
};

export const getUser = async (uid: string): Promise<ApiResponse<BackendUserSchema>> => {
    const response = await axiosInstance.get(ENDPOINTS.GET_USER.replace(':uid', uid));
    if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
    }
    throw new Error(response.data.error || 'Failed to get user');
};

export const updateUser = async (uid: string, data: BackendUserSchema): Promise<ApiResponse<BackendUserSchema>> => {
    const response = await axiosInstance.put(ENDPOINTS.UPDATE_PROFILE.replace(':uid', uid), data);
    if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
    }
    throw new Error(response.data.error || 'Failed to update user');
};