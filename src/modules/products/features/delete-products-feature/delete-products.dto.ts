import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class DeleteProductsDto {
  @AutoMap()
  @ApiProperty({ example: [1, 2], required: true })
  @Transform(({ value }) => value.map((data) => Number(data)))
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  ids: number[];
}
