import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategys/jwt.strategy';
import { UserModule } from '@modules/user/user.module';
import { LoginController } from './controllers/login/login.controller';

@Module({
  imports: [UserModule],
  providers: [AuthService, JwtStrategy],
  controllers: [LoginController],
})
export class AuthModule {}
