import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TopicSchema } from "../../api/types/topicTypes";
import { fetchTopicsList, fetchTopicContent } from "../../api/services/topicApis";

interface TopicsState {
  topics: TopicSchema[];
  loading: boolean;
  error: string | null;
}

const initialState: TopicsState = {
  topics: [],
  loading: false,
  error: null,
};

export const getAllTopics = createAsyncThunk<TopicSchema[], string>(
  'topics/list',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetchTopicsList(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch topics');
    }
  }
);

export const getTopicDetails = createAsyncThunk<TopicSchema, string>(
  'topics/details',
  async (topicId: string, { rejectWithValue }) => {
    try {
      const response = await fetchTopicContent(topicId);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch topic details');
    }
  }
);

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    updateStatusInTopicList: (state, action) => {
      const { topic_id, status } = action.payload;
      const index = state.topics.findIndex(topic => topic.topic_id === topic_id);
      if (index !== -1) {
        state.topics[index].status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(getAllTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Unable to fetch topics';
      })
      .addCase(getTopicDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopicDetails.fulfilled, (state, action) => {
        const id = action.payload.topic_id;
        const index = state.topics.findIndex((topic) => topic.topic_id === id);
        if (index !== -1) {
          const existingTopic = state.topics[index];
          state.topics[index] = {
            ...action.payload,
            status: existingTopic.status,
          };
        } else {
          state.topics.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(getTopicDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Unable to fetch topic details';
      })
  },
});

export const { updateStatusInTopicList } = topicsSlice.actions;
export default topicsSlice.reducer;