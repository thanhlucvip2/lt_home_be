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
import { CreateProductsFeature } from './features/create-products-feature/create-products.feature';
import { GetProductsDto } from './features/get-products-feature/get-products.dto';
import { GetProductsFeature } from './features/get-products-feature/get-products.feature';
import { CreateProductsDto } from './features/create-products-feature/create-products.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateProductsMapper } from './mapper/create-products/create-products.mapper';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/products`)
export class ProductsController {
  constructor(
    private readonly createProductsFeature: CreateProductsFeature,
    private readonly getProductFeature: GetProductsFeature,
    @InjectMapper()
    private readonly mapper: Mapper,
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
    @Body() createProductsDto: CreateProductsDto,
    @Res() res: AppResponse,
    @Req() req: AppRequests,
  ) {
    const resData: ResponseModel<any> = {
      statusCode: HttpStatus.OK,
      success: 'create-products-success',
      data: null,
    };

    try {
      const payload = this.mapper.map(
        createProductsDto,
        CreateProductsDto,
        CreateProductsMapper,
      );

      const { user } = req;
      const currentUser: UserModel = user;
      const data = await this.createProductsFeature.create({
        user: currentUser,
        payload,
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
