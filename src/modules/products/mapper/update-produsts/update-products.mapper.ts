import { AutoMap } from '@automapper/classes';

export class UpdateProductsMapper {
  @AutoMap()
  id: number;

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

  @AutoMap()
  status: number;
}
