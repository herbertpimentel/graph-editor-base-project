import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

interface AppDatabaseModuleConfig {
  databaseName: string;
  schema: any;
}

@Module({
  providers: [],
  exports: [],
})
export class DatabaseModule {
  static forRoot(options: AppDatabaseModuleConfig): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      providers: [
        {
          provide: options.databaseName,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const pool = new Pool({
              connectionString: configService.getOrThrow('DATABASE_URL'),
            });

            return drizzle(pool, {
              casing: 'snake_case',
              logger: true,
              schema: options.schema,
            });
          },
        },
      ],
      exports: [options.databaseName],
    };
  }
}
