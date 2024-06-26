import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseModel } from 'src/interface/response.model';
import { API_PREFIX_PATH } from '@configs/app.config';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MailDTO } from './mail.dto';
import { MailService } from './mail.service';

@Controller(`${API_PREFIX_PATH}/mail`)
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post()
  @ApiBearerAuth('token')
  @ApiTags('Auth')
  @ApiCreatedResponse({ description: 'Login-success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Res()
    res: Response,
    @Body()
    mailDto: MailDTO,
  ) {
    const resData: ResponseModel<{ token: string }> = {
      statusCode: HttpStatus.OK,
      success: 'send-mail-success',
      data: null,
    };
    try {
      const options = {
        to: mailDto.email,
        from: 'LT HOME',
        subject: 'Test Mail',
        template: 'confirmation.hbs',
        context: {
          name: 'hello mail',
        },
      };

      await this.mailService.send(options);
    } catch (error) {
      throw new HttpException(error.message, error.stats);
    }
    return res.status(HttpStatus.OK).json(resData);
  }
}
