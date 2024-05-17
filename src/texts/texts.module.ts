import { Module } from '@nestjs/common'
import { TextsService } from './texts.service'
import { TextsController } from './texts.controller'
import { PrismaModule } from '../shared/services/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [TextsService],
  controllers: [TextsController]
})
export class TextsModule {}
