import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { assign } from 'lodash';
import { API_PREFIX_PATH } from '@configs/app.config';
import { ResponseModel } from '@model/response.model';
import { ServiceGuard } from '@modules/auth/guards/guards.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppRequests, AppResponse } from '@model/index.model';
import { UserModel } from '@model/user.model';
import { ProductsService } from './products.service';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/products`)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
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
  @ApiBearerAuth('token')
  @ApiResponse({ description: 'get-products-success' })
  @ApiBadRequestResponse({ description: 'Unauthorized' })
  @ApiTags('Products')
  @Post()
  async createProduct(@Res() res: AppResponse, @Req() req: AppRequests) {
    const resData: ResponseModel<any> = {
      statusCode: HttpStatus.OK,
      success: 'create-products-success',
      data: null,
    };

    try {
      const { user } = req;
      const currentUser: UserModel = user;
      const data = await this.productsService.create({
        user: currentUser,
      });
      assign(resData, {
        data,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return res.status(HttpStatus.OK).json(resData);
  }
}
