import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  CamelCaseNamingConvention,
  createMap,
  namingConventions,
  SnakeCaseNamingConvention,
  type Mapper,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UpdateProductsMapper } from './update-products.mapper';
import { UpdateProductsDto } from '../../features/update-products-feature/update-products.dto';

@Injectable()
export class UpdateProductsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        UpdateProductsDto,
        UpdateProductsMapper,
        namingConventions({
          source: new CamelCaseNamingConvention(),
          destination: new SnakeCaseNamingConvention(),
        }),
      );
    };
  }
}
