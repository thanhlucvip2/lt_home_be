import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  CamelCaseNamingConvention,
  createMap,
  namingConventions,
  SnakeCaseNamingConvention,
  type Mapper,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateProductsMapper } from './create-products.mapper';
import { CreateProductsDto } from '@modules/products/features/create-products-feature/create-products.dto';

@Injectable()
export class CreateProductsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateProductsDto,
        CreateProductsMapper,
        namingConventions({
          source: new CamelCaseNamingConvention(),
          destination: new SnakeCaseNamingConvention(),
        }),
      );
    };
  }
}
