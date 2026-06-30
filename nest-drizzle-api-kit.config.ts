import { defineApiKitConfig } from 'nest-drizzle-api-kit';

export default defineApiKitConfig({
  outputPath: './src/resources/generated/api',
  dbProviderToken: 'database_connection',
  resources: [
    './src/resources/tabela-custa.resource.ts',
  ],
});
