import { Injectable, OnModuleInit } from '@nestjs/common'
import { collectDefaultMetrics, register } from 'prom-client'

@Injectable()
export class MetricsService implements OnModuleInit {
    onModuleInit () {
        collectDefaultMetrics()
    }

    async getMetrics () {
        return await register.metrics()
    }
}
