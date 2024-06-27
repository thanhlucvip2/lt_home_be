import { AutoMap } from '@automapper/classes';

export class GetProductsMapper {
  @AutoMap()
  id: number;

  @AutoMap()
  productName: string;

  @AutoMap()
  description: string;

  @AutoMap()
  size: string;

  @AutoMap()
  weight: number;

  @AutoMap()
  createBy: string;

  @AutoMap()
  updateBy: string;
}
