import { Injectable } from '@nestjs/common';
import { UserModel } from '@model/user.model';
import { ProductsService } from '../products.service';

@Injectable()
export class CreateProductFeature {
  constructor(private readonly productsService: ProductsService) {}

  async create({ user }: { user: UserModel }) {
    return this.productsService.createProducts({
      user,
      products: {
        sku: 1,
        product_name: 'dfafdas',
        description: 'dfskaf',
        weight: 10,
        size: '10x20x20',
      },
    });
  }
}
