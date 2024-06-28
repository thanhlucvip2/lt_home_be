import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { map, compact, find, merge } from 'lodash';
import { ProductsRepository } from '@modules/products/products.repository';
import { UserEntity } from '@modules/user/user.entity';
import { ProductsService } from '@modules/products/products.service';
import { UpdateProductsMapper } from '@modules/products/mapper/update-produsts/update-products.mapper';

@Injectable()
export class UpdateProductsFeature {
  constructor(
    private readonly productsService: ProductsService,

    private readonly productsRepository: ProductsRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async index({
    user,
    payload,
  }: {
    user: UserEntity;
    payload: UpdateProductsMapper[];
  }) {
    // create queryRunner
    const queryRunner =
      await this.productsRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const listProducts = await this.productsService.find({
        ids: map(payload, 'id'),
      });

      const mergedArray = compact(
        map(listProducts, (productEntity) => {
          const updateMapper = find(payload, {
            id: productEntity.id,
          });
          if (updateMapper) {
            return merge({}, productEntity, updateMapper);
          }
          return null;
        }),
      );
      this.productsService.updateListT({
        user,
        queryRunner,
        payload: mergedArray,
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
    return null;
  }
}
