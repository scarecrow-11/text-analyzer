import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        try {
            console.log('Connecting to the database...')
            await this.$connect()
            console.log('Successfully connected to the database!')
        } catch (e) {
            console.error(e)
        }
    }

    async onModuleDestroy() {
        try {
            console.log('Disconnecting from the database...')
            await this.$disconnect()
        } catch (e) {
            console.error(e)
        }
    }
}
