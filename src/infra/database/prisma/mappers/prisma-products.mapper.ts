import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  Prisma,
  Product as PrismaProduct,
  Attachment as PrismaAttachment,
} from '@prisma/client'
import { Product } from '@/domain/products/enterprise/entities/product'
import { ProductAttachmentsList } from '@/domain/products/enterprise/entities/product-attachments-list'
import { Attachment } from '@/domain/attachments/enterprise/entities/attachment'

type ProductWithAttachments = PrismaProduct & {
  attachments?: PrismaAttachment[]
}

export class PrismaProductMapper {
  static toDomain(raw: ProductWithAttachments): Product {
    return Product.create(
      {
        name: raw.name,
        price: raw.price,
        reference: raw.reference,
        supplierId: new UniqueEntityID(raw.supplierId ?? ''),
        stock: raw.stock,
        attachments: new ProductAttachmentsList(),
        attachmentsList: raw.attachments?.map((attachment) => {
          return Attachment.create(
            {
              title: attachment.title,
              url: attachment.url,
            },
            new UniqueEntityID(attachment.id),
          )
        }),
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
      supplierId: product.supplierId?.toString(),
      stock: product.stock,
    }
  }
}
