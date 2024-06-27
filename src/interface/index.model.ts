import { UserEntity } from '@modules/user/user.entity';
import { Request, Response } from 'express';

export type AppRequests = Request & {
  user: UserEntity;
};

export type AppResponse = Response;
