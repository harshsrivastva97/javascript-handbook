import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, RegisterRequest, ProfileUpdateRequest } from '../../api/types/userTypes';
import { registerUser, fetchUserProfile, updateUserProfile } from '../../api/services/userApi';


interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    token: null,
};

// Async thunks
export const register = createAsyncThunk('user/register', async (data: RegisterRequest) => {
    const response = await registerUser(data);
    return response;
});

export const getProfile = createAsyncThunk('user/getProfile', async () => {
    const response = await fetchUserProfile();
    return response;
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (data: ProfileUpdateRequest) => {
    const response = await updateUserProfile(data);
    return response;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
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
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;