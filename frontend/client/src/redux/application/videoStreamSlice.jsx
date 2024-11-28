import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import videoStreamService from './videoStreamService'

const initialState = {
    isLoadingStream: false,
    isSuccess: false,
    isError: false,
    message: "",
}

export const startStreamThunk = createAsyncThunk(
    'stream/startStream',
    async (formData, thunkAPI) => {
        try {
            const response = await videoStreamService.startStream(formData)
            return response;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const videoStreamSlice = createSlice({
    name: 'videStream',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startStreamThunk.pending, (state) => {
                state.isLoadingStream = true;
            })
            .addCase(startStreamThunk.fulfilled, (state, action) => {
                state.isLoadingStream = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(startStreamThunk.rejected, (state, action) => {
                state.isLoadingStream = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})
export const {reset} = videoStreamSlice.actions;
export default videoStreamSlice.reducer;