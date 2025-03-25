import { Product } from '@/domain/products/enterprise/entities/product'

export class ProductPresenter {
  static toHTTP(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      supplierId: product.supplierId.toString(),
      reference: product.reference,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}
