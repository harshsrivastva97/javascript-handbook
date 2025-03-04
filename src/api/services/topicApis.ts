import axiosInstance from '../config/axiosInstance';
import { TopicSchema } from '../types/topicTypes';
import { ENDPOINTS } from '../urls/urls';

export const fetchTopicsList = async (): Promise<TopicSchema[]> => {
    const response = await axiosInstance.get(ENDPOINTS.GET_TOPICS_LIST);
    return response.data;
};

export const fetchTopicDetails = async (topic_id: string): Promise<TopicSchema> => {
    const response = await axiosInstance.get(ENDPOINTS.GET_TOPIC_DETAILS.replace(':topicId', topic_id))
    return response.data
}