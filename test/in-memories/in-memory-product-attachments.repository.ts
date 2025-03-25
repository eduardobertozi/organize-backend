import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductsAttachmentsRepository } from '@/domain/products/application/repositories/product-attachments.repository'
import { ProductAttachment } from '@/domain/products/enterprise/entities/product-attachment'

export class InMemoryProductAttachmentsRepository
  implements ProductsAttachmentsRepository
{
  public items: ProductAttachment[] = []

  async createMany(attachments: ProductAttachment[]): Promise<void> {
    this.items.push(...attachments)
    await Promise.resolve()
  }

  async deleteMany(attachments: ProductAttachment[]): Promise<void> {
    const productAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })

    this.items = productAttachments
    await Promise.resolve()
  }

  async findManyByProductId(
    productId: UniqueEntityID,
  ): Promise<ProductAttachment[]> {
    return Promise.resolve(
      this.items.filter((item) => item.productId.equals(productId)),
    )
  }

  async deleteManyByProductId(productId: UniqueEntityID): Promise<void> {
    this.items = this.items.filter((item) => item.productId !== productId)
    await Promise.resolve()
  }
}
