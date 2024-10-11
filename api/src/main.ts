import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => {
          return Object.values(err.constraints).join(', '); // Join messages for each validation error
        });
        return new BadRequestException(messages);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
