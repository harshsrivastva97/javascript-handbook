import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchListOfSnippets, fetchSnippet } from "../../api/services/snippetApis";
import { SnippetSchema } from "../../api/types/snippetTypes";

interface SnippetsState {
    snippets: SnippetSchema[];
    loading: boolean;
    error: string | null;
}

const initialState: SnippetsState = {
    snippets: [],
    loading: false,
    error: null,
};

export const fetchSnippetsList = createAsyncThunk<SnippetSchema[], string>(
    'snippets/fetchSnippetsList',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await fetchListOfSnippets(userId);
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch codebook');
        }
    }
);

export const fetchSnippetById = createAsyncThunk<SnippetSchema, string>(
    'snippets/fetchSnippetById',
    async (snippetId: string, { rejectWithValue }) => {
        try {
            const response = await fetchSnippet(snippetId);
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch codebook snippet');
        }
    }
);

const codebookSlice = createSlice({
    name: 'codebook',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSnippetsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSnippetsList.fulfilled, (state, action) => {
                state.loading = false;
                state.snippets = action.payload;
            })
            .addCase(fetchSnippetsList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch codebook';
            })
            .addCase(fetchSnippetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSnippetById.fulfilled, (state, action) => {
                const id = action.payload.snippet_id;
                const index = state.snippets.findIndex((snippet) => snippet.snippet_id === id);
                if (index !== -1) {
                    state.snippets[index] = {
                        ...action.payload
                    };
                } else {
                    state.snippets.push(action.payload);
                }
                state.loading = false;
            })
            .addCase(fetchSnippetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch codebook snippet';
            });
    },
});

export const { } = codebookSlice.actions;
export default codebookSlice.reducer;