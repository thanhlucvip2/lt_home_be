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
import { ResponseModel } from 'src/interface/response.model';
import { UserModel } from '@model/user.model';
import { API_PREFIX_PATH } from '@configs/app.config';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ROLE } from '@utils/enums';
import { AppRequests, AppResponse } from 'src/interface/index.model';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/auth`)
export class GetProfileController {
  @ApiBearerAuth('token')
  @ApiResponse({ description: 'get-profile-success' })
  @ApiBadRequestResponse({ description: 'Unauthorized' })
  @ApiTags('Auth')
  @Get('profile')
  getProfile(@Res() res: AppResponse, @Req() req: AppRequests) {
    const resData: ResponseModel<UserModel> = {
      statusCode: HttpStatus.OK,
      success: 'get-profile-success',
    };
    try {
      const { user } = req;
      const currentUser: UserModel = {
        roleUser:
          user.role === ROLE.ADMIN.VALUE ? ROLE.ADMIN.LABEL : ROLE.USER.LABEL,
        id: user.id,
        email: user.email,
        fullName: `${user.last_name} ${user.first_name}`,
      };

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
