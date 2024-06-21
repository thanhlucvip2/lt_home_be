import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { UserModel } from '@model/user.model';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(payload: { user: UserModel }) {
    return payload;
  }
}
