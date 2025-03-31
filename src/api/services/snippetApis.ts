import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../urls/urls';
import { SnippetSchema } from '../types/snippetTypes.js';
import ApiResponse from '../types/apiResponseType';

export const fetchListOfSnippets = async (userId: string): Promise<SnippetSchema[]> => {
    const response = await axiosInstance.get<ApiResponse<SnippetSchema[]>>(ENDPOINTS.GET_SNIPPETS.replace(':userId', userId));
    if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
    }
    throw new Error(response.data.error || 'Failed to fetch codebook');
};

export const fetchSnippet = async (snippetId: string): Promise<SnippetSchema> => {
    const response = await axiosInstance.get<ApiResponse<SnippetSchema>>(ENDPOINTS.GET_SNIPPET.replace(':snippetId', snippetId));
    if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
    }
    throw new Error(response.data.error || 'Failed to fetch codebook snippet');
};