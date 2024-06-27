import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { assign } from 'lodash';
import { API_PREFIX_PATH } from '@configs/app.config';
import { ResponseModel } from 'src/interface/response.model';
import { ServiceGuard } from '@modules/auth/guards/guards.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppRequests, AppResponse } from 'src/interface/index.model';
import { UserModel } from '@model/user.model';
import { CreateProductFeature } from './features/create-products-feature/create-product.feature';
import { GetProductsDto } from './features/get-products-feature/get-products.dto';
import { GetProductsFeature } from './features/get-products-feature/get-products.feature';
import { CreateProductDto } from './features/create-products-feature/create-product.dto';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/products`)
export class ProductsController {
  constructor(
    private readonly createProductFeature: CreateProductFeature,
    private readonly getProductFeature: GetProductsFeature,
  ) {}
  @ApiBearerAuth('token')
  @ApiResponse({ description: 'get-products-success' })
  @ApiBadRequestResponse({ description: 'Unauthorized' })
  @ApiTags('Products')
  @Get()
  async getProducts(
    @Query() getProductsDto: GetProductsDto,
    @Res() res: AppResponse,
  ) {
    const resData: ResponseModel<any> = {
      statusCode: HttpStatus.OK,
      success: 'get-products-success',
      data: null,
    };
    try {
      const data = await this.getProductFeature.list(getProductsDto);
      assign(resData, {
        data,
      });
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
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: AppResponse,
    @Req() req: AppRequests,
  ) {
    const resData: ResponseModel<any> = {
      statusCode: HttpStatus.OK,
      success: 'create-products-success',
      data: null,
    };

    try {
      const { user } = req;
      const currentUser: UserModel = user;
      const data = await this.createProductFeature.create({
        user: currentUser,
        payload: createProductDto,
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
