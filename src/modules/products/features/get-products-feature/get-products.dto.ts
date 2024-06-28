import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Max, Min, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { PAGINATION, SORT_DESC } from '@utils/constants';
import { SortBy } from '@utils/types';
import { IsSortOrderValue } from '@validations/is-sort-order-value';

export class GetProductsDto {
  // filter data
  @ApiProperty({ example: '', required: false })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  sku: number;

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  product_name: string;

  @ApiProperty({ example: '', required: false })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  status: number;

  // meta data
  @ApiProperty({ example: 'sku', required: false })
  @IsOptional()
  sortName: string;

  @ApiProperty({ example: 'ASC', required: false })
  @Transform(({ value }) => value || SORT_DESC)
  @IsOptional()
  @Validate(IsSortOrderValue)
  sortBy: SortBy = SORT_DESC;

  @ApiProperty({
    example: 10,
    required: false,
  })
  @Transform(({ value }) => Number(value || PAGINATION.LIMIT))
  @IsOptional()
  @Min(1)
  @Max(100)
  limit: number = PAGINATION.LIMIT;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @Transform(({ value }) => Number(value || PAGINATION.PAGE_DEFAULT))
  @IsOptional()
  @Min(1)
  page: number = PAGINATION.PAGE_DEFAULT;
}
