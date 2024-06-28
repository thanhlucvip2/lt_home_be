import { Injectable } from '@nestjs/common';
import { has, assign } from 'lodash';
import { IsNull, Like } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { GetProductsDto } from './get-products.dto';
import { SORT_DESC } from '@utils/constants';

import { PRODUCTS_SORT_FILED } from '@modules/products/constants';
import { ProductsRepository } from '@modules/products/products.repository';
import { PRODUCTS_RELATION } from '@utils/relations';
import { QueryDataAndMeta } from '@model/query-data-and-meta.model';
import { ProductsEntity } from '@modules/products/products.entity';
import { GetProductsMapper } from '@modules/products/mapper/get-products/get-products.mapper';

@Injectable()
export class GetProductsFeature {
  constructor(
    private readonly productsRepository: ProductsRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async index(queryParams: GetProductsDto) {
    const { limit, page, sortBy, sortName, sku, product_name, status } =
      queryParams;
    // Conditions
    let conditionsField = {};
    if (sku) {
      conditionsField = assign(conditionsField, {
        sku: sku,
      });
    }
    if (product_name) {
      conditionsField = assign(conditionsField, {
        product_name: Like(`%${product_name}%`),
      });
    }
    if (status || status === 0) {
      conditionsField = assign(conditionsField, {
        status: status,
      });
    }
    // Sort column
    let orderField = {};
    if (has(PRODUCTS_SORT_FILED, `${sortName}`)) {
      orderField = assign(orderField, {
        [`${PRODUCTS_SORT_FILED[`${sortName}`]}`]: sortBy,
      });
    } else {
      orderField = assign(orderField, {
        id: SORT_DESC,
      });
    }
    const [results, total] = await this.productsRepository.findAndCount({
      where: {
        ...conditionsField,
        deleted_at: IsNull(),
      },
      order: { ...orderField },
      relations: [
        PRODUCTS_RELATION.CREATE_BY,
        PRODUCTS_RELATION.UPDATE_BY,
        PRODUCTS_RELATION.INVENTORY,
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    const data = this.mapper.mapArray(
      results,
      ProductsEntity,
      GetProductsMapper,
    );

    return new QueryDataAndMeta<GetProductsMapper>({
      data,
      total,
      queryParams,
    });
  }
}
