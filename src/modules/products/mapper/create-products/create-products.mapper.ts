import { AutoMap } from '@automapper/classes';

export class CreateProductsMapper {
  @AutoMap()
  sku: number;

  @AutoMap()
  product_name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  size: string;

  @AutoMap()
  weight: number;
}
