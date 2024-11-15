import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createStream } from "./streamService";

export const createStreamThunk = createAsyncThunk(
    'stream/createStream',
    async (streamData, thunkAPI) => {
        try {
            return await createStream(streamData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
const streamSlice = createSlice({
    name: 'streams',
    initialState: {
        streams: [],
        loading : false,
        error: null
    },
    reducers : {},
    extraReducers: (builder) => {
        builder
            .addCase(createStreamThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStreamThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.streams.push(action.payload);
            })
            .addCase(createStreamThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})