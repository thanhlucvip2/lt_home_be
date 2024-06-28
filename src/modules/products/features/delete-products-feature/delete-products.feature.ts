import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductsService } from '../../products.service';
import { ProductsRepository } from '../../products.repository';
import { DeleteProductsDto } from './delete-products.dto';
import { UserEntity } from '@modules/user/user.entity';
import { InventoryService } from '../../../inventory/inventory.service';
import { map } from 'lodash';
import { PRODUCTS_RELATION } from '@utils/relations';
@Injectable()
export class DeleteProductsFeature {
  constructor(
    private readonly productsService: ProductsService,
    private readonly inventoryService: InventoryService,
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
      const listProducts = await this.productsService.find({
        ids,
        relations: [PRODUCTS_RELATION.INVENTORY],
      });

      await this.productsService.deleteT({
        queryRunner,
        user,
        ids,
      });
      await this.inventoryService.deleteT({
        queryRunner,
        ids: map(listProducts, 'inventory_id.id'),
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
