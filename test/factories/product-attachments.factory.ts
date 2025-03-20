import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  ProductAttachment,
  ProductAttachmentProps,
} from '@/domain/products/enterprise/entities/product-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeProductAttachment(
  override: Partial<ProductAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  return ProductAttachment.create(
    {
      productId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class ProductAttachmentFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaProductAttachment(
    data: Partial<ProductAttachmentProps> = {},
  ): Promise<ProductAttachment> {
    const productAttachment = makeProductAttachment(data)

    await this.prismaService.attachment.update({
      where: {
        id: productAttachment.attachmentId.toString(),
      },
      data: {
        productId: productAttachment.productId.toString(),
      },
    })

    return productAttachment
  }
}
