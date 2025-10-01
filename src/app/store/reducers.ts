import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '@/entities/user/model/userSlice';

export const rootReducer = combineReducers({
  users: userReducer,
});