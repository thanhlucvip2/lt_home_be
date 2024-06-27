import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 1, required: true })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  sku: number;

  @ApiProperty({ example: 'product_name', required: true })
  @IsString()
  product_name: string;

  @ApiProperty({ example: 'description', required: false })
  @IsOptional()
  description: string;

  @ApiProperty({ example: '100', required: true })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  weight: number;

  @ApiProperty({ example: '10x20x30', required: true })
  @IsString()
  size: string;
}
