import { PrismaService } from '@/infrastructure/database/prisma.service'
import { Injectable } from '@nestjs/common'
import { AttachmentsRepository } from '../attachments.repository'
import { Attachment } from '../test/attachment'
import { PrismaAttachmentMapper } from './attachment.mapper'

@Injectable()
export class PrismaAttachmentsService implements AttachmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)
    await this.prisma.attachment.create({ data })
  }
}
