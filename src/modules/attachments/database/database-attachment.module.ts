import { PrismaService } from '@/infrastructure/database/prisma.service'
import { Module } from '@nestjs/common'
import { AttachmentsRepository } from '../attachments.repository'
import { PrismaAttachmentsService } from './prisma-attachments.service'

@Module({
  providers: [
    PrismaService,
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsService,
    },
  ],
  exports: [PrismaService, AttachmentsRepository],
})
export class DatabaseAttachmentsModule {}
