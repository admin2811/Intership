import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import streamService from "./streamService";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isLogoutSuccess: false,
    isError: false,
    message: "",
    streams: []
  };

export const createStreamThunk = createAsyncThunk(
    'stream/create',
    async (formData, thunkAPI) => {
        try{
            const response = await streamService.createStream(formData);
            return response;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const startStreamThunk = createAsyncThunk(
    'stream/startStream',
    async (formData, thunkAPI) => {
        try {
            const response = await streamService.startStream(formData);
            return response;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const getStreamsByUserThunk = createAsyncThunk(
    'stream/getStreamsByUser',
    async (userId, thunkAPI) => {
        try{
            const response = await streamService.getStreamsByUser(userId);
            return response;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const streamSlice = createSlice({
    name: 'stream',
    initialState,
    reducers : {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.isLogoutSuccess = false;
            state.message = "";
            state.streams = [];
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
                state.streams = action.payload
                state.message = action.payload.message;
            })
            .addCase(createStreamThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
        builder
            .addCase(getStreamsByUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStreamsByUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.streams = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(getStreamsByUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
        builder
            .addCase(startStreamThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(startStreamThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(startStreamThunk.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.payload.message;
            })
    },
})

export const { reset } = streamSlice.actions;
export default streamSlice.reducer;