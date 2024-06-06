import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { NoXPoweredByMiddleware } from '@middlewares/no-x-powered-by.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { THROTTLER_LIMIT, THROTTLER_TTL } from '@utils/constants';
import { MailModule } from 'src/services/email/mail.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    MailModule,
    ThrottlerModule.forRoot([
      {
        ttl: THROTTLER_TTL,
        limit: THROTTLER_LIMIT,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoXPoweredByMiddleware).forRoutes('*');
  }
}
