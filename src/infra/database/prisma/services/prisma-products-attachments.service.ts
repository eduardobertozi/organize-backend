import { ProductsAttachmentsRepository } from '@/domain/products/application/repositories/product-attachments.repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { ProductAttachment } from '@/domain/products/enterprise/entities/product-attachment'
import { PrismaProductAttachmentsMapper } from '../mappers/prisma-product-attachments.mapper'

@Injectable()
export class PrismaProductAttachmentsService
  implements ProductsAttachmentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async createMany(attachments: ProductAttachment[]): Promise<void> {
    if (attachments.length < 1) return

    const data = PrismaProductAttachmentsMapper.toPrismaUpdateMany(attachments)
    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: ProductAttachment[]): Promise<void> {
    if (attachments.length < 1) return

    const attachmentsIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentsIds,
        },
      },
    })
  }

  async findManyByProductId(productId: string): Promise<ProductAttachment[]> {
    const productAttachments = await this.prisma.attachment.findMany({
      where: {
        productId,
      },
    })

    return productAttachments.map((attachment) =>
      PrismaProductAttachmentsMapper.toDomain(attachment),
    )
  }

  async deleteManyByProductId(productId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        productId,
      },
    })
  }
}
