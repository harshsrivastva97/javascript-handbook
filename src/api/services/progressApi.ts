import axiosInstance from '../config/axiosInstance';
import ApiResponse from '../types/apiResponseType';
import { ProgressSchema } from '../types/progress';
import { ENDPOINTS } from '../urls/urls';

export const updateProgress = async (userProgress: ProgressSchema): Promise<ApiResponse<ProgressSchema>> => {
    const response = await axiosInstance.put(ENDPOINTS.UPDATE_USER_PROGRESS, userProgress);
    if (response.data.status === 'success' && response.data.data) {
        return response.data;
    }
    throw new Error(response.data.error || 'Failed to update user progress');
};

export const resetProgressById = async (userId: string): Promise<ApiResponse<ProgressSchema>> => {
    const response = await axiosInstance.delete(ENDPOINTS.RESET_USER_PROGRESS.replace(':user_id', userId));
    if (response.data.status === 'success' && response.data.data) {
        return response.data;
    }
    throw new Error(response.data.error || 'Failed to reset user progress');
};