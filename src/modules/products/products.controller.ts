import { API_PREFIX_PATH } from '@configs/app.config';
import { ResponseModel } from '@model/response.model';
import { ServiceGuard } from '@modules/auth/guards/guards.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppRequests, AppResponse } from '@model/index.model';
import { UserModel } from '@model/user.model';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/products`)
export class ProductsController {
  @ApiBearerAuth('token')
  @ApiResponse({ description: 'get-products-success' })
  @ApiBadRequestResponse({ description: 'Unauthorized' })
  @ApiTags('Products')
  @Get()
  getProducts(@Res() res: AppResponse, @Req() req: AppRequests) {
    const resData: ResponseModel<any> = {
      statusCode: HttpStatus.OK,
      success: 'get-products-success',
      data: null,
    };
    const { user } = req;
    const currentUser: UserModel = user;
    console.log(currentUser);
    try {
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return res.status(HttpStatus.OK).json(resData);
  }
}
