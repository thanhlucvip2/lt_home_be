import { Injectable } from '@nestjs/common';
import { has, assign } from 'lodash';

import { GetProductsDto } from './get-products.dto';
import { PRODUCTS_SORT_FILED } from '@modules/products/constants';
import { SORT_DESC } from '@utils/constants';
import { ProductsRepository } from '@modules/products/products.repository';
import { PRODUCTS_RELATION } from '@utils/relations';
import { QueryDataAndMeta } from '@model/query-data-and-meta.model';
import { ProductsEntity } from '@modules/products/products.entity';
import { Like } from 'typeorm';

@Injectable()
export class GetProductsFeature {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async list(queryParams: GetProductsDto) {
    const { limit, page, sortBy, sortName, sku, product_name } = queryParams;
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
        deleted_at: null,
        ...conditionsField,
      },
      order: { ...orderField },
      relations: [PRODUCTS_RELATION.CREATE_BY, PRODUCTS_RELATION.UPDATE_BY],
      skip: (page - 1) * limit,
      take: limit,
    });

    return new QueryDataAndMeta<Partial<ProductsEntity>>({
      data: results,
      total,
      queryParams,
    });
  }
}
