import axiosInstance from '../config/axiosInstance';
import { UserProgressSchema } from '../types/userProgress';
import { ENDPOINTS } from '../urls/urls';

export const fetchUserProgress = async (userId: string): Promise<UserProgressSchema[]> => {
    const response = await axiosInstance.get(ENDPOINTS.GET_USER_PROGRESS.replace(':userId', userId));
    return response.data.userProgress;
};

export const updateUserProgress = async (userProgress: UserProgressSchema): Promise<UserProgressSchema> => {
    const response = await axiosInstance.put(ENDPOINTS.UPDATE_USER_PROGRESS, userProgress);
    return response.data.userProgress;
};