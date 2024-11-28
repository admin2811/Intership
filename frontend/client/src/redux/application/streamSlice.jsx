import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import streamService from "./streamService";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isLogoutSuccess: false,
    isError: false,
    message: "",
    streams: [],
    streamsInfo: []
};

// Thunk để tạo stream
export const createStreamThunk = createAsyncThunk(
    'stream/create',
    async (formData, thunkAPI) => {
        try {
            const response = await streamService.createStream(formData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
        }
    }
);

// Thunk để lấy streams theo user
export const getStreamsByUserThunk = createAsyncThunk(
    'stream/getStreamsByUser',
    async (userId, thunkAPI) => {
        try {
            const response = await streamService.getStreamsByUser(userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
        }
    }
);

// Thunk để lấy thông tin stream
export const getStreamInfoThunk= createAsyncThunk(
    'stream/getStreamInfo',
    async (_, thunkAPI) => {
        try {
            const response = await streamService.getStreamInfo();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
        }
    }
);

const streamSlice = createSlice({
    name: 'stream',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.isLogoutSuccess = false;
            state.message = "";
            state.streams = [];
            state.streamsInfo = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStreamThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createStreamThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.streams = action.payload.data || [];
                state.message = action.payload.message;
            })
            .addCase(createStreamThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || action.error.message;
            });

        builder
            .addCase(getStreamsByUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStreamsByUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.streams = action.payload.data || [];
                state.message = action.payload.message;
            })
            .addCase(getStreamsByUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || action.error.message;
            });

        builder
            .addCase(getStreamInfoThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStreamInfoThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.streamsInfo = action.payload.data.streams || [];
                state.message = action.payload.message;
            })
            .addCase(getStreamInfoThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || action.error.message;
            });
    },
});

export const { reset } = streamSlice.actions;
export default streamSlice.reducer;
