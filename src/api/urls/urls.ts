export const API_URL = 'http://localhost:9000/api';

export const USER_URL = `${API_URL}/user`;

export const ENDPOINTS = {
    // User
    REGISTER: `${USER_URL}/register`,
    GET_USER: `${USER_URL}/:uid`,
    UPDATE_PROFILE: `${USER_URL}/:uid`,
    // Topics
    GET_TOPICS_LIST: `${API_URL}/topics/list/:userId`,
    GET_TOPIC_DETAILS: `${API_URL}/topics/details/:topicId`,
    // User Progress
    UPDATE_USER_PROGRESS: `${API_URL}/progress`
};