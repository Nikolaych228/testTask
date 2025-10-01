import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from './types';
import { loadUsersFromStorage, saveUsersToStorage } from '../lib/userStorage';

const initialState: User[] = loadUsersFromStorage();

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      const newUser: User = {
        ...action.payload,
        id: crypto.randomUUID(),
      };
      state.push(newUser);
      saveUsersToStorage(state);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveUsersToStorage(state);
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const filtered = state.filter(u => u.id !== action.payload);
      return filtered;
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;