import axiosInstance from '../config/axiosInstance';
import ApiResponse from '../types/apiResponseType';
import { UserProgressSchema } from '../types/userProgress';
import { ENDPOINTS } from '../urls/urls';

export const updateUserProgress = async (userProgress: UserProgressSchema): Promise<ApiResponse<UserProgressSchema>> => {
    const response = await axiosInstance.put(ENDPOINTS.UPDATE_USER_PROGRESS, userProgress);
    if (response.data.status === 'success' && response.data.data) {
        return response.data;
    }
    throw new Error(response.data.error || 'Failed to update user progress');
};