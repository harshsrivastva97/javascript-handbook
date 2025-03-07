export const API_URL = 'http://localhost:9000/api';

export const USER_URL = `${API_URL}/user`;
export const TOPICS_URL = `${API_URL}/topics`;
export const PROGRESS_URL = `${API_URL}/progress`;

export const ENDPOINTS = {
    // User
    REGISTER: `${USER_URL}/register`,
    GET_USER: `${USER_URL}/:uid`,
    UPDATE_PROFILE: `${USER_URL}/:uid`,
    // Topics
    GET_TOPICS_LIST: `${TOPICS_URL}/list/:userId`,
    GET_TOPIC_CONTENT: `${TOPICS_URL}/content/:topicId`,
    // User Progress
    UPDATE_USER_PROGRESS: `${PROGRESS_URL}/update`
};