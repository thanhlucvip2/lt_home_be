import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { JWT_SECRET_KEY } from '@configs/app.config';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const id = payload?.id;

    const accountDB = await this.userService.findOne(id);
    if (accountDB === null) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (!accountDB) {
      return done(new UnauthorizedException('unauthorized-access'), false);
    }

    return done(null, accountDB);
  }
}
