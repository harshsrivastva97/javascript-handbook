import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
    emailVerified?: boolean;
    createdAt?: string;
    socialLinks?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        website?: string;
    };
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

export const { setUser, clearUser, updateUserProfile, setError } = authSlice.actions;
export default authSlice.reducer;