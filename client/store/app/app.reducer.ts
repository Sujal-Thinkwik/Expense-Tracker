import { combineReducers } from '@reduxjs/toolkit';
import { configSlice } from '@/store/app/config.slice';
import { authSlice } from '@/store/app/auth.slice';

export const appReducer = combineReducers({
  auth: authSlice.reducer,
  config: configSlice.reducer
});
