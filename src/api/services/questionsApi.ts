import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../urls/urls';

export const getArenaQuestions = async () => {
    const response = await axiosInstance.get(ENDPOINTS.GET_ARENA_QUESTIONS);
    return response.data;
};