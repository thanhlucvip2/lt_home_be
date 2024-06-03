import { HttpStatus } from '@nestjs/common';

export interface ResponseModel<T> {
  statusCode: HttpStatus;
  success: string;
  data?: T;
}
