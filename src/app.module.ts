import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TextsModule } from './texts/texts.module'
import { MetricsModule } from './metrics/metrics.module'

@Module({
  imports: [TextsModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
