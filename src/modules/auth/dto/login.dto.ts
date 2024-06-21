import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

import { IsMailSpam } from '@validations/is-email-spam';

export class AuthLoginDTO {
  @ApiProperty({
    example: 'admin@lthome.com',
  })
  @IsNotEmpty({ message: 'email-empty' })
  @Validate(IsMailSpam)
  @IsEmail({}, { message: 'email-format-wrong' })
  email: string;

  @ApiProperty({
    example: 'Lthome12345@',
  })
  @IsNotEmpty({ message: 'password-empty' })
  @MinLength(8, { message: 'password-min-6' })
  @MaxLength(20, { message: 'password-max-20' })
  password: string;
}
