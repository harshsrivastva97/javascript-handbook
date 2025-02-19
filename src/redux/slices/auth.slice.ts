import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
}

const initialState: User = {
    displayName: '',
    email: '',
    photoURL: '',
    uid: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser: (state, action: PayloadAction<{ username: string; email: string; password: string }>) => {
            try {
                const { username, email, password } = action.payload;
            } catch (error) {
                console.error('Error in updateTopicStatus reducer:', error);
            }
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
            state.uid = action.payload.uid;
        }
    }
});

export const { registerUser, setUser } = authSlice.actions;
export default authSlice.reducer;