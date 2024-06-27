import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class CreateProductsDto {
  @AutoMap()
  @ApiProperty({ example: Math.floor(Math.random() * 10000), required: true })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  sku: number;

  @AutoMap()
  @ApiProperty({ example: 'product_name', required: true })
  @IsString()
  productName: string;

  @AutoMap()
  @ApiProperty({ example: 'description', required: false })
  @IsOptional()
  description: string;

  @AutoMap()
  @ApiProperty({ example: '100', required: true })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  weight: number;

  @AutoMap()
  @ApiProperty({ example: '10x20x30', required: true })
  @IsString()
  size: string;
}
