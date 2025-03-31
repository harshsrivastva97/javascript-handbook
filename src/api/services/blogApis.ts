import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../urls/urls';
import { BlogSchema } from '../types/blogTypes';
import ApiResponse from '../types/apiResponseType';


export const fetchBlogList = async (): Promise<ApiResponse<BlogSchema[]>> => {
    const response = await axiosInstance.get(ENDPOINTS.GET_BLOGS_LIST);
    if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
    }
    throw new Error(response.data.error || 'Failed to fetch blogs list');
};


export const fetchBlogFile = async (blogId: number): Promise<ApiResponse<BlogSchema>> => {
    const response = await axiosInstance.get(
        ENDPOINTS.GET_BLOG_DETAILS.replace(':blogId', blogId.toString())
    );
    if (response.data.status === 'success' && response.data.data) {
        return response.data.data;
    }
    throw new Error(response.data.error || 'Failed to fetch blog content');
};
