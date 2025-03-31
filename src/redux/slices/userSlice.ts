import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserSchema } from '../../constants/interfaces/user';
import { getUser, registerUser, updateUser } from '../../api/services/userApi';

interface UserState {
    user: UserSchema | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const register = createAsyncThunk<UserSchema, UserSchema>(
    'user/register',
    async (data, { rejectWithValue }) => {
        try {
            const response = await registerUser(data);
            if (!response.data) {
                return rejectWithValue('Registration failed - no data received');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
        }
    }
);

export const getUserProfile = createAsyncThunk<UserSchema, string>(
    'user/get',
    async (uid, { rejectWithValue }) => {
        try {
            const response = await getUser(uid);
            if (!response.data) {
                return rejectWithValue('User profile not found');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to get user profile');
        }
    }
);

export const updateUserProfile = createAsyncThunk<UserSchema, UserSchema>(
    'user/update',
    async (data, { rejectWithValue }) => {
        try {
            const response = await updateUser(data);
            if (!response.data) {
                return rejectWithValue('Update failed - no data received');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update user profile');
        }
    }
);

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