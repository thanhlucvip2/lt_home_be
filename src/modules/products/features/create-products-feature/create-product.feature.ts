import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from '@model/user.model';
import { ProductsService } from '../../products.service';
import { ProductsRepository } from '../../products.repository';
import { CreateProductDto } from './create-product.dto';

@Injectable()
export class CreateProductFeature {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async create({
    user,
    payload,
  }: {
    user: UserModel;
    payload: CreateProductDto;
  }) {
    // create queryRunner
    const queryRunner =
      await this.productsRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.productsService.createProductsT({
        queryRunner,
        user,
        products: payload,
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
    return null;
  }
}
