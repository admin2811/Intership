import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCpuLoad = createAsyncThunk(
    'cpu/fetchCpuLoad',
    async () => {
        const response = await axios.get('http://localhost:5000/api/cpu/load');
        return response.data;
    }
)
const cpuSlice = createSlice({
    name: 'cpu',
    initialState: {
        loading: false,
        data: {load1: 0, load5: 0, load15: 0},
        error: ''
    },  
    extraReducers: (builder) => {
        builder
            .addCase(fetchCpuLoad.pending, (state) => {
                state.loading = true;
            })        
            .addCase(fetchCpuLoad.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCpuLoad.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default cpuSlice.reducer;