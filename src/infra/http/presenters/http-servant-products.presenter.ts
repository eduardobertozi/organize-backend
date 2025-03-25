import { ServantProduct } from '@/domain/servant-products/entreprise/entities/servant-product'

export class ServantProductsPresenter {
  static toHTTP(servantProduct: ServantProduct) {
    return {
      id: servantProduct.id.toString(),
      servantId: servantProduct.servantId,
      productId: servantProduct.productId,
    }
  }
}
