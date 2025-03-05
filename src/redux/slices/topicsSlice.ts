import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TopicSchema } from "../../api/types/topicTypes";
import { fetchTopicsList, fetchTopicDetails } from "../../api/services/topicApis";
import { updateUserProgress } from "../../api/services/userProgressApi";
import { UserProgressSchema } from "../../api/types/userProgress";

interface TopicsState {
    topics: TopicSchema[];
    loading: boolean,
    error: string | null
}

const initialState: TopicsState = {
    topics: [],
    loading: false,
    error: null
}

export const getAllTopics = createAsyncThunk<TopicSchema[], string>('topics/list', async (userId: string) => {
    const response = await fetchTopicsList(userId);
    return response;
})

export const getTopicDetails = createAsyncThunk<TopicSchema, string>('topics/details', async (topicId: string) => {
    const response = await fetchTopicDetails(topicId)
    return response
})

// progress api
export const updateTopicStatus = createAsyncThunk<UserProgressSchema, UserProgressSchema>('userProgress/update', async (userProgress: UserProgressSchema) => {
    const response = await updateUserProgress(userProgress)
    return response
})

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllTopics.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getAllTopics.fulfilled, (state, action) => {
            state.loading = false
            state.topics = action.payload
        })
        .addCase(getAllTopics.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Unable to fetch topics"
        })
        .addCase(getTopicDetails.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getTopicDetails.fulfilled, (state, action) => {
            const id = action.payload.topic_id
            const index = state.topics.findIndex(topic => topic.topic_id === id)
            if (index !== -1) {
                state.topics[index] = action.payload
            } else {
                state.topics.push(action.payload)
            }
            state.loading = false
        })
        .addCase(getTopicDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Unable to fetch topics"
        })
        .addCase(updateTopicStatus.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateTopicStatus.fulfilled, (state, action) => {
            state.loading = false
            const index = state.topics.findIndex(topic => {
                return topic.topic_id === action.payload.topic_id
            });
            state.topics[index] = {
                ...state.topics[index],
                status: action.payload.status
            };
        })
        .addCase(updateTopicStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Unable to update topic status"
        })
    }
});

export const { } = topicsSlice.actions;
export default topicsSlice.reducer;