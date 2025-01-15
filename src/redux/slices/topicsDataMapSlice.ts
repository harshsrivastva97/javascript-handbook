import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopicsState {
  topics: Array<{
    id: number;
    status: 'pending' | 'in-progress' | 'completed';
  }>;
  topicsToConceptsMap: Record<string, number>;
}

const initialState: TopicsState = {
  topics: [],
  topicsToConceptsMap: {}
};

const topicsDataMapSlice = createSlice({
  name: 'topicsData',
  initialState,
  reducers: {
    updateTopicStatus: (state, action: PayloadAction<{ topicId: number; status: 'pending' | 'in-progress' | 'completed' }>) => {
      try {
        const { topicId, status } = action.payload;
        const existingTopic = state.topics.find(t => t.id === topicId);
        
        if (existingTopic) {
          existingTopic.status = status;
        } else {
          state.topics.push({ id: topicId, status });
        }
      } catch (error) {
        console.error('Error in updateTopicStatus reducer:', error);
      }
    }
  }
});

export const { updateTopicStatus } = topicsDataMapSlice.actions;
export default topicsDataMapSlice.reducer;