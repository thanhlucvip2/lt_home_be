import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { assign } from 'lodash';
import { AuthGuard } from '@nestjs/passport';
import { ServiceGuard } from '../guards/guards.service';
import { Response } from 'express';
import { ResponseModel } from '@model/response.model';
import { UserModel } from '@model/user.model';
import { RequestsModel } from '@model/requests.model';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller('auth')
export class GetProfileController {
  @Get('profile')
  getProfile(@Res() res: Response, @Req() req: RequestsModel) {
    const resData: ResponseModel<UserModel> = {
      statusCode: HttpStatus.OK,
      success: 'get-profile-success',
    };
    try {
      const { user } = req;
      const currentUser: UserModel = user;
      assign(resData, {
        data: {
          ...currentUser,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return res.status(HttpStatus.OK).json(resData);
  }
}
