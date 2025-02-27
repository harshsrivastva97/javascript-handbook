import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserDataObject } from '../../api/types/userTypes';
import { getUser, registerUser, updateUser } from '../../api/services/userApi';

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const register = createAsyncThunk<UserDataObject, UserDataObject>('user/register', async (data: UserDataObject) => {
    const response = await registerUser(data);
    return response;
});

export const getUserProfile = createAsyncThunk<UserDataObject, string>('user/get', async (uid: string) => {
    const response = await getUser(uid);
    return response;
});

export const updateUserProfile = createAsyncThunk<UserDataObject, UserDataObject>('user/update', async (data: UserDataObject) => {
    const response = await updateUser(data.uid, data);
    return response;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            })
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to get user profile';
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update user profile';
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;