import { Injectable } from '@nestjs/common';
import { has, assign } from 'lodash';

import { GetProductsDto } from './get-products.dto';
import { PRODUCTS_SORT_FILED } from '@modules/products/constants';
import { SORT_DESC } from '@utils/constants';
import { ProductsRepository } from '@modules/products/products.repository';
import { PRODUCTS_RELATION } from '@utils/relations';
import { QueryDataAndMeta } from '@model/query-data-and-meta.model';
import { ProductsEntity } from '@modules/products/products.entity';

@Injectable()
export class GetProductsFeature {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async list(queryParams: GetProductsDto) {
    const { limit, page, sortBy, sortName } = queryParams;
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

  // async list({
  //   queryParams,
  //   vendorid,
  // }: {
  //   vendorid: string;
  //   queryParams: GetAuthorityGroupListDto;
  // }): Promise<QueryDataAndMeta<AuthorityGroupListMapper>> {
  //   const { limit, page, sortBy, sortName } = queryParams;

  //   // Sort column
  //   let orderField = {};
  //   if (has(AUTHORITY_GROUP_SORT_FIELD, `${sortName}`)) {
  //     orderField = assign(orderField, {
  //       [`${AUTHORITY_GROUP_SORT_FIELD[`${sortName}`]}`]: sortBy,
  //     });
  //   } else {
  //     orderField = assign(orderField, {
  //       id: SORT_DESC,
  //     });
  //   }

  //   const [results, total] = await this.authorityGroupRepository.findAndCount({
  //     where: {
  //       vendorid,
  //     },
  //     order: { ...orderField },
  //     relations: [AUTHORITY_GROUP_VENDER.M_ACCOUNT_VENDER_CUSTOM],
  //     skip: (page - 1) * limit,
  //     take: limit,
  //   });

  //   const data = this.mapper.mapArray(
  //     results,
  //     AuthorityGroupVenderEntity,
  //     AuthorityGroupListMapper,
  //   );

  //   return new QueryDataAndMeta<AuthorityGroupListMapper>({
  //     data,
  //     total,
  //     queryParams,
  //   });
  // }
}
