import axiosInstance from '../../utils/axiosInstance';
import { ENDPOINTS } from '../urls/urls';
import { RegisterRequest, RegisterResponse, User, ProfileUpdateRequest } from '../types/userTypes';

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post(ENDPOINTS.REGISTER, data);
    return response.data;
};

export const fetchUserProfile = async (): Promise<User> => {
    const response = await axiosInstance.get(ENDPOINTS.PROFILE);
    return response.data;
};

export const updateUserProfile = async (data: ProfileUpdateRequest): Promise<User> => {
    const response = await axiosInstance.put(ENDPOINTS.UPDATE_PROFILE, data);
    return response.data;
};