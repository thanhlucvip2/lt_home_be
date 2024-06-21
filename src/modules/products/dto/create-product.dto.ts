import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateProductsDTO {
  @ApiProperty({
    example: 'products name',
  })
  @IsNotEmpty({ message: 'products-name-empty' })
  @MinLength(8, { message: 'password-min-6' })
  products_name: string;

  @ApiProperty({
    example: 'description',
  })
  @IsNotEmpty({ message: 'description-empty' })
  description: string;

  @ApiProperty({
    example: 'note',
  })
  @IsOptional()
  note?: string;

  @ApiProperty({
    example: 'weight',
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    example: '10x20x30',
  })
  @IsNotEmpty({ message: 'size-empty' })
  size: string;
}
