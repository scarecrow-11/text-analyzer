import './instrument'
import * as Sentry from '@sentry/node'
import { NestFactory, HttpAdapterHost, BaseExceptionFilter } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // Sentry error handling
  const { httpAdapter } = app.get(HttpAdapterHost)
  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter))

  await app.listen(PORT)
}
bootstrap()
