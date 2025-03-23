import { Product } from '@/domain/products/enterprise/entities/product'

export class ProductPresenter {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      supplierId: product.supplierId,
      reference: product.reference,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}
