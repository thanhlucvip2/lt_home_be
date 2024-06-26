import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { assign } from 'lodash';
import { ResponseModel } from 'src/interface/response.model';
import { UserService } from '@modules/user/user.service';
import { AuthLoginDTO } from '@modules/auth/dto/login.dto';
import { API_PREFIX_PATH } from '@configs/app.config';
import { AuthService } from '../auth.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller(`${API_PREFIX_PATH}/auth`)
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('register')
  @ApiBearerAuth('token')
  @ApiTags('Auth')
  @ApiCreatedResponse({ description: 'Login-success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Res()
    res: Response,
    @Body()
    userDto: AuthLoginDTO,
  ) {
    const resData: ResponseModel<{ token: string }> = {
      statusCode: HttpStatus.OK,
      success: 'login-success',
      data: null,
    };
    try {
      const accountDb = await this.userService.findUserByEmail(userDto.email);
      if (!accountDb) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      console.log(this.authService.hashPassword(userDto.password));
      const checkHashPassword = await this.authService.comparePassword(
        userDto.password,
        accountDb.password,
      );
      if (!checkHashPassword) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const token = await this.authService.createTokenAndRefreshToken(
        accountDb.id,
      );
      assign(resData, {
        data: {
          token,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.stats);
    }
    return res.status(HttpStatus.OK).json(resData);
  }
}
