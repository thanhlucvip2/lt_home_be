import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductsService } from '../../products.service';
import { ProductsRepository } from '../../products.repository';
import { DeleteProductsDto } from './delete-products.dto';
import { UserEntity } from '@modules/user/user.entity';

@Injectable()
export class DeleteProductsFeature {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async delete({
    user,
    payload,
  }: {
    user: UserEntity;
    payload: DeleteProductsDto;
  }) {
    const { ids } = payload;
    // create queryRunner
    const queryRunner =
      await this.productsRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.productsService.deleteProductsT({
        queryRunner,
        user,
        ids,
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
