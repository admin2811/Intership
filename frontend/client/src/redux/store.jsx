import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cpuReducer from './cpu/cpuSlice';
import streamReducer from './application/streamSlice';
import videoStreamReducer from './application/videoStreamSlice';
export const store = configureStore({
  reducer: { 
    auth: authReducer,
    cpu: cpuReducer,
    stream: streamReducer,
    videoStream: videoStreamReducer
 },
});