import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../urls/urls';
import { UserDataObject } from '../types/userTypes';

export const registerUser = async (data: UserDataObject): Promise<UserDataObject> => {
    const response = await axiosInstance.post(ENDPOINTS.REGISTER, data);
    return response.data.user;
};

export const getUser = async (uid: string): Promise<UserDataObject> => {
    const response = await axiosInstance.get(ENDPOINTS.GET_USER.replace(':uid', uid));
    return response.data.user;
};

export const updateUser = async (uid: string, data: UserDataObject): Promise<UserDataObject> => {
    const response = await axiosInstance.put(ENDPOINTS.UPDATE_PROFILE.replace(':uid', uid));
    return response.data.user;
};