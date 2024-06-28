import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class UpdateProductsDto {
  @AutoMap()
  @ApiProperty({ example: 1, required: true })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

  @AutoMap()
  @ApiProperty({ example: 'product_name', required: false })
  @IsString()
  productName: string;

  @AutoMap()
  @ApiProperty({ example: 'description', required: false })
  @IsOptional()
  description: string;

  @AutoMap()
  @ApiProperty({ example: '100', required: false })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  weight: number;

  @AutoMap()
  @ApiProperty({ example: '10x20x30', required: false })
  @IsString()
  size: string;

  @AutoMap()
  @ApiProperty({ example: 0, required: false })
  @IsString()
  status: number;
}
