import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { AttachmentsRepository } from '@/domain/attachments/application/repositories/attachments.repository'
import { Attachment } from '@/domain/attachments/enterprise/entities/attachment'
import { PrismaAttachmentMapper } from '@/infra/database/prisma/mappers/prisma-attachment.mapper'

@Injectable()
export class PrismaAttachmentsService implements AttachmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)
    await this.prisma.attachment.create({ data })
  }
}
