import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { UserModel } from '@model/user.model';
import { ProductsEntity } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async createProducts(payload: {
    user: UserModel;
    products: Partial<ProductsEntity>;
  }) {
    const newProducts = await this.productsRepository.create({
      ...payload.products,
      update_by: payload.user,
      create_by: payload.user,
    });
    await this.productsRepository.save(newProducts);
  }

  async findAll() {
    return await this.productsRepository.find({
      where: {
        deleted_at: null,
      },
    });
  }
}
