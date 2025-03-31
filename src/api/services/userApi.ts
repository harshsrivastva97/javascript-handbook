import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../urls/urls';
import { UserSchema } from '../../constants/interfaces/user';
import ApiResponse from '../types/apiResponseType';

export const registerUser = async (data: UserSchema): Promise<ApiResponse<UserSchema>> => {
    const response = await axiosInstance.post(ENDPOINTS.REGISTER, data);
    if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
    }
    throw new Error(response.data.error || 'Failed to register user');
};

export const getUser = async (userId: string): Promise<ApiResponse<UserSchema>> => {
    const response = await axiosInstance.get(ENDPOINTS.GET_USER.replace(':userId', userId));
    if (response.data.status === 'success' && response.data.data) {
        return response.data;
    }
    throw new Error(response.data.error || 'Failed to get user');
};

export const updateUser = async (data: UserSchema): Promise<ApiResponse<UserSchema>> => {
    const response = await axiosInstance.put(ENDPOINTS.UPDATE_PROFILE, data);
    if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
    }
    throw new Error(response.data.error || 'Failed to update user');
};