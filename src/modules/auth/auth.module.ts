import { DynamicModule, Module, Type } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { jwtConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

import { AuthService } from './auth.service';
import { RequestService } from './request.service';
import { UserIdentificationMiddleware } from './user-identification.middleware';
import { IUserSessionService } from './types/auth';
import { USER_SESSION_SERVICE_TOKEN } from './consts';

interface AppAuthModuleConfig {
  serviceClass: Type<IUserSessionService>;
}

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {},
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UserIdentificationMiddleware,
    AuthService,
    RequestService,
  ],
  exports: [UserIdentificationMiddleware, AuthService, RequestService],
  controllers: [AuthController],
})
export class AuthModule {
  static forRoot(options: AppAuthModuleConfig): DynamicModule {
    return {
      global: true,
      module: AuthModule,
      providers: [
        {
          provide: USER_SESSION_SERVICE_TOKEN,
          useClass: options.serviceClass,
        },
      ],
    };
  }
}
