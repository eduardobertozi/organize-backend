import { ProductAttachment } from '../entities/product-attachment'
import { ProductAttachmentRepository } from '../repositories/product-attachments.repository'

export class InMemoryProductAttachmentsRepository
  implements ProductAttachmentRepository
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

  async findManyByProductId(productId: string): Promise<ProductAttachment[]> {
    return Promise.resolve(
      this.items.filter((item) => item.productId.toString() === productId),
    )
  }

  async deleteManyByProductId(productId: string): Promise<void> {
    this.items = this.items.filter(
      (item) => item.productId.toString() !== productId,
    )
    await Promise.resolve()
  }
}
