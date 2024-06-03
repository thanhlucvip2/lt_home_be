import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

import { IsMailSpam } from '@validations/is-email-spam';

export class MailDTO {
  @ApiProperty({
    example: 'you@gmail.com',
  })
  @IsNotEmpty({ message: 'email-empty' })
  @Validate(IsMailSpam)
  @IsEmail({}, { message: 'email-format-wrong' })
  email: string;
}
