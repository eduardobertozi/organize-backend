import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductAttachment } from '@/domain/products/enterprise/entities/product-attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaProductAttachmentsMapper {
  static toDomain(raw: PrismaAttachment): ProductAttachment {
    if (!raw.productId) {
      throw new Error('Invalid attachment type')
    }

    return ProductAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        productId: new UniqueEntityID(raw.productId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrismaUpdateMany(
    attachments: ProductAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentsIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    return {
      where: {
        id: {
          in: attachmentsIds,
        },
      },
      data: {
        productId: attachments[0].productId.toString(),
      },
    }
  }
}
