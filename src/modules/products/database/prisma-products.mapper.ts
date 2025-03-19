import { UniqueEntityID } from '@/core/unique-entity-id'
import { Prisma, Product as PrismaProduct } from '@prisma/client'
import { Product } from '../entities/product'
import { ProductAttachmentsList } from '../entities/product-attachments-list'

export class PrismaProductMapper {
  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
        price: raw.price,
        reference: raw.reference,
        supplierId: new UniqueEntityID(raw.supplierId),
        attachments: new ProductAttachmentsList(),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      reference: product.reference,
      supplierId: product.supplierId.toString(),
    }
  }
}
