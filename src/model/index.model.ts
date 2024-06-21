import { UserModel } from './user.model';
import { Request, Response } from 'express';

export type AppRequests = Request & {
  user: UserModel;
};

export type AppResponse = Response;
