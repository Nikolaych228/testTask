import type { User }  from '../model/types.ts';

const KEY = 'users_crud_redux';

export const loadUsersFromStorage = (): User[] => {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveUsersToStorage = (users: User[]): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users', e);
  }
};