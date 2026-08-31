import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './modules/auth/auth.module';

import { UserIdentificationMiddleware } from './modules/auth/user-identification.middleware';
import { UserSessionService } from './user-session.service';

import * as schema from './database-schema';
import { GRAPH_EDITOR_MODULES } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    AuthModule.forRoot({ serviceClass: UserSessionService }),

    // Modules Injected by Graph Editor
  ],
  controllers: [],
  providers: [UserSessionService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdentificationMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
