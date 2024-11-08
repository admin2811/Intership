import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cpuReducer from './cpu/cpuSlice';
export const store = configureStore({
  reducer: { 
    auth: authReducer,
    cpu: cpuReducer
 },
});