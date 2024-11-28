import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchSystemStats= createAsyncThunk(
    'cpu/fetchCpuLoad',
    async () => {
        const response = await axios.get('http://localhost:5000/api/cpu/load');
        return response.data;
    }
)
const cpuSlice = createSlice({
    name: 'cpu',
    initialState: {
    cpuLoad: '',
    disk: {
      total: '',
      used: '',
      available: '',
      usage: ''
    },
    memory: {
      total: '',
      used: '',
      available: '',
      usage: ''
    },
    jvmHeap: {
      total: '',
      used: '',
      usage: ''
    },
    loading: false,
    error: ''
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSystemStats.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        state.cpuLoad = data.cpuLoad;
        state.disk = data.disk;
        state.memory = data.memory;
        state.jvmHeap = data.jvmHeap;
      })
      .addCase(fetchSystemStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
})

export default cpuSlice.reducer;