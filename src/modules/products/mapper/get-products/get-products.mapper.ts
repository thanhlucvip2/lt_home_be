import { AutoMap } from '@automapper/classes';

export class GetProductsMapper {
  @AutoMap()
  id: number;

  @AutoMap()
  sku: number;

  @AutoMap()
  productName: string;

  @AutoMap()
  description: string;

  @AutoMap()
  inventory: {
    id: number;
    quantity: number;
  };

  @AutoMap()
  size: string;

  @AutoMap()
  status: string;

  @AutoMap()
  weight: number;

  @AutoMap()
  createBy: string;

  @AutoMap()
  updateBy: string;

  @AutoMap()
  createdAt: string;

  @AutoMap()
  updatedAt: string;
}
