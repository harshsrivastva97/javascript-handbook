export const API_URL = 'http://localhost:9000/api';

export const USER_URL = `${API_URL}/user`;
export const LIBRARY_URL = `${API_URL}/library`;
export const PROGRESS_URL = `${API_URL}/progress`;
export const SNIPPETS_URL = `${API_URL}/snippets`;
export const BLOGS_URL = `${API_URL}/blogs`;
export const ARENA_URL = `${API_URL}/questions`;

export const ENDPOINTS = {
    // User
    REGISTER: `${USER_URL}/register`,
    GET_USER: `${USER_URL}/:userId`,
    UPDATE_PROFILE: `${USER_URL}`,
    // User Progress
    UPDATE_USER_PROGRESS: `${PROGRESS_URL}/update`,
    RESET_USER_PROGRESS: `${PROGRESS_URL}/reset/:userId`,
    // Library
    GET_LIBRARY: `${LIBRARY_URL}/:userId`,
    GET_TOPIC_CONTENT: `${LIBRARY_URL}/topic/:topicId`,
    // Codebook
    GET_SNIPPETS: `${SNIPPETS_URL}/:userId`,
    GET_SNIPPET: `${SNIPPETS_URL}/snippet/:snippetId`,
    // Blogs
    GET_BLOGS_LIST: `${BLOGS_URL}/`,
    GET_BLOG_DETAILS: `${BLOGS_URL}/:blogId`,
    // Arena
    GET_ARENA_QUESTIONS: `${ARENA_URL}/`,
};