import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
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
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppRequests, AppResponse } from 'src/interface/index.model';
import { CreateProductsFeature } from './features/create-products-feature/create-products.feature';
import { GetProductsDto } from './features/get-products-feature/get-products.dto';
import { GetProductsFeature } from './features/get-products-feature/get-products.feature';
import { CreateProductsDto } from './features/create-products-feature/create-products.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateProductsMapper } from './mapper/create-products/create-products.mapper';
import { DeleteProductsDto } from './features/delete-products-feature/delete-products.dto';
import { DeleteProductsFeature } from './features/delete-products-feature/delete-products.feature';
import { UserEntity } from '@modules/user/user.entity';
import { UpdateProductsFeature } from './features/update-products-feature/update-products.feature';
import { UpdateProductsDto } from './features/update-products-feature/update-products.dto';
import { UpdateProductsMapper } from './mapper/update-produsts/update-products.mapper';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/products`)
export class ProductsController {
  constructor(
    private readonly createProductsFeature: CreateProductsFeature,
    private readonly updateProductsFeature: UpdateProductsFeature,
    private readonly getProductFeature: GetProductsFeature,
    private readonly deleteProductsFeature: DeleteProductsFeature,
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
    const resData: ResponseModel<null> = {
      statusCode: HttpStatus.OK,
      success: 'get-products-success',
      data: null,
    };
    try {
      const data = await this.getProductFeature.index(getProductsDto);
      assign(resData, {
        data,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return res.status(HttpStatus.OK).json(resData);
  }

  @ApiBearerAuth('token')
  @ApiResponse({ description: 'create-products-success' })
  @ApiBadRequestResponse({ description: 'Unauthorized' })
  @ApiTags('Products')
  @Post()
  async createProduct(
    @Body() createProductsDto: CreateProductsDto,
    @Res() res: AppResponse,
    @Req() req: AppRequests,
  ) {
    const resData: ResponseModel<null> = {
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
      const data = await this.createProductsFeature.create({
        user,
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
  @ApiBearerAuth('token')
  @ApiResponse({ description: 'update-products-success' })
  @ApiBadRequestResponse({ description: 'Unauthorized' })
  @ApiBody({ type: [UpdateProductsDto] })
  @ApiTags('Products')
  @Put()
  async updateProduct(
    @Body() updateProductsDto: UpdateProductsDto[],
    @Res() res: AppResponse,
    @Req() req: AppRequests,
  ) {
    const resData: ResponseModel<null> = {
      statusCode: HttpStatus.OK,
      success: 'update-products-success',
      data: null,
    };

    try {
      const payload = this.mapper.mapArray(
        updateProductsDto,
        UpdateProductsDto,
        UpdateProductsMapper,
      );
      const { user } = req;
      const data = await this.updateProductsFeature.index({
        user,
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

  @ApiBearerAuth('token')
  @ApiResponse({ description: 'delete-products-success' })
  @ApiBadRequestResponse({ description: 'Unauthorized' })
  @ApiTags('Products')
  @Delete()
  async deleteProducts(
    @Body() payload: DeleteProductsDto,
    @Res() res: AppResponse,
    @Req() req: AppRequests,
  ) {
    const resData: ResponseModel<null> = {
      statusCode: HttpStatus.OK,
      success: 'delete-products-success',
      data: null,
    };

    try {
      const { user } = req;
      const currentUser: UserEntity = user;
      const data = await this.deleteProductsFeature.delete({
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
