import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../urls/urls';

export const getQuizQuestions = async () => {
    const response = await axiosInstance.get(ENDPOINTS.GET_QUIZ_QUESTIONS);
    return response.data;
};