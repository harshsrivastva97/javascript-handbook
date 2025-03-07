import axiosInstance from '../config/axiosInstance';
import ApiResponse from '../types/apiResponseType';
import { TopicSchema } from '../types/topicTypes';
import { ENDPOINTS } from '../urls/urls';

export const fetchTopicsList = async (userId: string): Promise<TopicSchema[]> => {
  const response = await axiosInstance.get<ApiResponse<TopicSchema[]>>(ENDPOINTS.GET_TOPICS_LIST.replace(':userId', userId));
  if (response.data.status === 'success' && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data.error || 'Failed to fetch topics list');
};

export const fetchTopicContent = async (topic_id: string): Promise<TopicSchema> => {
  const response = await axiosInstance.get<ApiResponse<TopicSchema>>(
    ENDPOINTS.GET_TOPIC_CONTENT.replace(':topicId', topic_id)
  );
  if (response.data.status === 'success' && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data.error || 'Failed to fetch topic content');
};