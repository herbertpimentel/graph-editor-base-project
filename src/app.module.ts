import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './modules/database/database.module';

import { AuthModule } from './modules/auth/auth.module';
import { ProcessosModule } from './modules/processos/processos.module';
import { UsersModule } from './modules/users/users.module';
// import { CustasModule } from './modules/custas/custas.module';

import { UserIdentificationMiddleware } from './modules/auth/user-identification.middleware';
import { UserSessionService } from './user-session.service';
import { DATABASE } from './constants';

import * as schema from './database-schema';
import { GeneratedApiModule } from './resources/generated/api';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule.forRoot({ serviceClass: UserSessionService }),
    DatabaseModule.forRoot({
      databaseName: DATABASE,
      schema: schema,
    }),
    UsersModule,
    ProcessosModule,
    GeneratedApiModule,
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
