import { Product } from '@/domain/products/enterprise/entities/product'

export class ProductPresenter {
  static toHTTP(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      supplierId: product.supplierId?.toString(),
      stock: product.stock,
      attachments: product.attachmentsList?.map((attachment) => ({
        id: attachment.id.toString(),
        title: attachment.title,
        url: attachment.url,
      })),
      reference: product.reference,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}
