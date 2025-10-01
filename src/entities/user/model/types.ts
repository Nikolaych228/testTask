export type Role = 'Admin' | 'User' | 'Manager';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
}