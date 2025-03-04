export const API_URL = 'http://localhost:9000/api';

export const USER_URL = `${API_URL}/user`;

export const ENDPOINTS = {
    // User
    REGISTER: `${USER_URL}/register`,
    GET_USER: `${USER_URL}/:uid`,
    UPDATE_PROFILE: `${USER_URL}/:uid`,
    // Topics
    GET_TOPICS_LIST: `${API_URL}/topics`,
    GET_TOPIC_DETAILS: `${API_URL}/topics/:topicId`,
    // User Progress
    GET_USER_PROGRESS: `${API_URL}/progress/:userId`,
    UPDATE_USER_PROGRESS: `${API_URL}/progress`
};