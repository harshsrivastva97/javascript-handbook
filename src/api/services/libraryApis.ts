import axiosInstance from '../config/axiosInstance';
import ApiResponse from '../types/apiResponseType';
import { LibrarySchema } from '../types/libraryTypes';
import { ENDPOINTS } from '../urls/urls';

export const fetchLibrary = async (userId: string): Promise<LibrarySchema[]> => {
  const response = await axiosInstance.get<ApiResponse<LibrarySchema[]>>(ENDPOINTS.GET_LIBRARY.replace(':userId', userId));
  if (response.data.status === 'success' && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data.error || 'Failed to fetch topics list');
};

export const fetchTopicContent = async (topic_id: string): Promise<LibrarySchema> => {
  const response = await axiosInstance.get<ApiResponse<LibrarySchema>>(
    ENDPOINTS.GET_TOPIC_CONTENT.replace(':topicId', topic_id)
  );
  if (response.data.status === 'success' && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data.error || 'Failed to fetch topic content');
};