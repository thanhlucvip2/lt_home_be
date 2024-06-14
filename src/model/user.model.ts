import { Role } from '@utils/types';

export type UserModel = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  roleUser?: string;
};
