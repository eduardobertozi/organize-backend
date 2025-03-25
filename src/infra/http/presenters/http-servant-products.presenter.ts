import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'

export class ServantProductsPresenter {
  static toHTTP(servantProduct: ServantProduct) {
    return {
      id: servantProduct.id.toString(),
      servantId: servantProduct.servantId,
      productId: servantProduct.productId,
    }
  }
}
