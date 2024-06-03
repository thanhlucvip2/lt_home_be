import { UserModel } from './user.model';

export type RequestsModel = Request & {
  user: UserModel;
};
