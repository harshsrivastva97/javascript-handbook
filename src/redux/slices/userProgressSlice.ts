import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserProgressSchema } from "../../api/types/userProgress";
import { fetchUserProgress, updateUserProgress } from "../../api/services/userProgressApi";

interface UserProgressState {
    progress: UserProgressSchema[];
    loading: boolean;
    error: string | null;
}

const initialState: UserProgressState = {
    progress: [],
    loading: false,
    error: null
}

export const getUserProgress = createAsyncThunk<UserProgressSchema[], string>('userProgress/get', async (uid: string) => {
    const response = await fetchUserProgress(uid)
    return response
})

export const updateTopicStatus = createAsyncThunk<UserProgressSchema, UserProgressSchema>('userProgress/update', async (userProgress: UserProgressSchema) => {
    const response = await updateUserProgress(userProgress)
    return response
})

const userProgressSlice = createSlice({
    name: 'userProgress',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProgress.fulfilled, (state, action) => {
                state.loading = false;
                state.progress = action.payload;
            })
            .addCase(getUserProgress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user progress';
            })
            .addCase(updateTopicStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTopicStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.progress.findIndex(p => p.topic_id === action.payload.topic_id);
                if (index !== -1) {
                    state.progress[index] = action.payload;
                } else {
                    state.progress.push(action.payload);
                }
            })
            .addCase(updateTopicStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update topic status';
            });
    }
})

export default userProgressSlice.reducer;