import { UniqueEntityID } from '@/core/unique-entity-id'
import { PrismaService } from '@/infrastructure/database/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Attachment, AttachmentProps } from './attachment'
import { PrismaAttachmentMapper } from '../database/attachment.mapper'

export function makeAttachment(
  override: Partial<AttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const attachment = Attachment.create(
    {
      title: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override,
    },
    id,
  )

  return attachment
}

@Injectable()
export class AttachmentsFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaAttachment(data: Partial<AttachmentProps> = {}) {
    const attachment = makeAttachment(data)

    await this.prisma.attachment.create({
      data: PrismaAttachmentMapper.toPrisma(attachment),
    })

    return attachment
  }
}
