import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cpuReducer from './cpu/cpuSlice';
import streamReducer from './application/streamSlice';
export const store = configureStore({
  reducer: { 
    auth: authReducer,
    cpu: cpuReducer,
    stream: streamReducer
 },
});