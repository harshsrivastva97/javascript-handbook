export const API_URL = 'http://localhost:9000/api';

export const USER_URL = `${API_URL}/user`;

export const ENDPOINTS = {
    REGISTER: `${USER_URL}/register`,
    GET_USER: `${USER_URL}/:uid`,
    UPDATE_PROFILE: `${USER_URL}/:uid`,
};