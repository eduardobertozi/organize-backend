import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductAttachment } from '../../enterprise/entities/product-attachment'

export abstract class ProductsAttachmentsRepository {
  abstract createMany(attachments: ProductAttachment[]): Promise<void>
  abstract deleteMany(attachments: ProductAttachment[]): Promise<void>
  abstract findManyByProductId(
    productId: UniqueEntityID,
  ): Promise<ProductAttachment[]>
  abstract deleteManyByProductId(productId: UniqueEntityID): Promise<void>
}
