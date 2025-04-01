import { Servant } from '@/domain/servants/enterprise/entities/servant'
import { ProductPresenter } from './http-products.presenter'

export class ServantPresenter {
  static toHTTP(servant: Servant) {
    return {
      id: servant.id.toString(),
      name: servant.name,
      productsPrice: servant.productsPrice,
      workForcePrice: servant.workForcePrice,
      profitPercent: servant.profitPercent,
      price: servant.price,
      products: servant.products?.map((product) =>
        ProductPresenter.toHTTP(product),
      ),
      createdAt: servant.createdAt,
      updatedAt: servant.updatedAt,
    }
  }
}
