import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listOfConcepts } from '../../data/concepts/index.ts';

interface TopicsState {
  topics: Array<{
    id: number;
    status: 'pending' | 'in-progress' | 'completed';
  }>;
  topicsToConceptsMap: Record<string, number>;
}

const initialState: TopicsState = {
  topics: [...listOfConcepts.map(concept => ({ id: concept.id, status: concept.status }))],
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
        }
      } catch (error) {
        console.error('Error in updateTopicStatus reducer:', error);
      }
    }
  }
});

export const { updateTopicStatus } = topicsDataMapSlice.actions;
export default topicsDataMapSlice.reducer;