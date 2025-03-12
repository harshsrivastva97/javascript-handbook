import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetProgressById, updateProgress } from "../../api/services/progressApi";
import { ProgressSchema } from "../../api/types/progress";
import { ProgressStatus } from "../../constants/enums/progressStatus";
import { updateStatusInTopicList } from "./topicsSlice";

interface ProgressState {
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  loading: false,
  error: null,
};

export const updateTopicStatus = createAsyncThunk<ProgressSchema, ProgressSchema>(
  "progress/update",
  async (progressData, { dispatch, rejectWithValue }) => {
    try {
      const { topic_id, status } = progressData;
      const response = await updateProgress(progressData);
      if (response.status === "success" && response.data) {
        dispatch(updateStatusInTopicList({ topic_id, status }));
        return progressData;
      }
      throw new Error(response.error || "Failed to update topic status");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update topic status"
      );
    }
  }
);

export const resetProgress = createAsyncThunk<null, string>(
  "progress/reset",
  async (userId, { rejectWithValue }) => {
    try {
      await resetProgressById(userId);
      return null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to reset progress"
      );
    }
  }
);

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTopicStatus.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateTopicStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTopicStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Unable to update topic status";
      })
      .addCase(resetProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetProgress.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to reset progress";
      });
  },
});

export default progressSlice.reducer;
