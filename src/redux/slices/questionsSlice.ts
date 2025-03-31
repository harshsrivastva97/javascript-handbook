import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getArenaQuestions } from "../../api/services/questionsApi";
import { QuizQuestion } from "../../constants/interfaces/questions";

interface QuestionsState {
    data: QuizQuestion[];
    loading: boolean;
    error: string;
}

const initialState: QuestionsState = {
    data: [],
    loading: false,
    error: ""
}

export const getQuestions = createAsyncThunk('questions/getQuestions', async () => {
    const response = await getArenaQuestions();
    return response;
})

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQuestions.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getQuestions.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(getQuestions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        })
    }
})  

export default questionsSlice.reducer;