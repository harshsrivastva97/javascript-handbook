import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogSchema } from "../../api/types/blogTypes";
import { fetchBlogList, fetchBlogFile } from "../../api/services/blogApis";

interface BlogsState {
    blogs: BlogSchema[];
    selectedBlog: BlogSchema | null;
    loading: boolean;
    error: string | null;
}

const initialState: BlogsState = {
    blogs: [],
    selectedBlog: null,
    loading: false,
    error: null,
};

export const fetchBlogs = createAsyncThunk<BlogSchema[], void>(
    'blogs/fetchBlogs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchBlogList();
            if (response.status === 'success' && response.data) {
                return response.data;
            }
            return rejectWithValue('No blogs data received');
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch blogs');
        }
    }
);

export const fetchBlogContent = createAsyncThunk<BlogSchema, number>(
    'blogs/fetchBlogContent',
    async (blogId, { rejectWithValue }) => {
        try {
            const response = await fetchBlogFile(blogId);
            if (!response.data) {
                return rejectWithValue('Blog content not found');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch blog content');
        }
    }
);

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch blogs';
            })
            .addCase(fetchBlogContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogContent.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBlog = action.payload;
            })
            .addCase(fetchBlogContent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch blog content';
            });
    },
});

export default blogsSlice.reducer;
