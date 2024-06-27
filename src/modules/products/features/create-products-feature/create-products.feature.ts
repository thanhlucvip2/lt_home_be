import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from '@model/user.model';
import { ProductsService } from '../../products.service';
import { ProductsRepository } from '../../products.repository';
import { CreateProductsMapper } from '@modules/products/mapper/create-products/create-products.mapper';

@Injectable()
export class CreateProductsFeature {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async create({
    user,
    payload,
  }: {
    user: UserModel;
    payload: CreateProductsMapper;
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
