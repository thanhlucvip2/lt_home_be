import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  CamelCaseNamingConvention,
  createMap,
  forMember,
  mapFrom,
  namingConventions,
  SnakeCaseNamingConvention,
  type Mapper,
  //   forMember,
  //   mapFrom,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GetProductsMapper } from './get-products.mapper';
import { ProductsEntity } from '@modules/products/products.entity';
import { formatDateToString } from '@utils/date-time';

@Injectable()
export class GetProductsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        ProductsEntity,
        GetProductsMapper,
        namingConventions({
          source: new SnakeCaseNamingConvention(),
          destination: new CamelCaseNamingConvention(),
        }),
        forMember(
          (d) => d.createBy,
          mapFrom(
            (d: ProductsEntity) =>
              d?.create_by.last_name + d?.create_by.first_name,
          ),
        ),
        forMember(
          (d) => d.updateBy,
          mapFrom(
            (d: ProductsEntity) =>
              d?.update_by.last_name + d?.update_by.first_name,
          ),
        ),
        forMember(
          (d) => d.createdAt,
          mapFrom((d: ProductsEntity) => formatDateToString(d.created_at)),
        ),
        forMember(
          (d) => d.updatedAt,
          mapFrom((d: ProductsEntity) => formatDateToString(d.updated_at)),
        ),
        forMember(
          (d) => d.inventory,
          mapFrom((d: ProductsEntity) => {
            return {
              id: d.inventory_id?.id,
              quantity: d.inventory_id?.quantity,
            };
          }),
        ),
      );
    };
  }
}
