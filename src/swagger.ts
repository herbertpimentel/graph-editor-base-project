import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('App')
    .setDescription('System API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('openapi', app, documentFactory, {
    jsonDocumentUrl: '/openapi.json', // path for JSON api spec
  });
}
