import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { CronService } from './cron.service'
import { CronController } from './cron.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
  ],
  controllers: [CronController],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
