import { Servant } from '@/domain/servants/enterprise/entities/servant'

export class ServantPresenter {
  static toHTTP(servant: Servant) {
    return {
      id: servant.id.toString(),
      name: servant.name,
      productsIds: servant.productsIds,
      productsPrice: servant.productsPrice,
      workForcePrice: servant.workForcePrice,
      profitPercent: servant.profitPercent,
      price: servant.price,
      createdAt: servant.createdAt,
      updatedAt: servant.updatedAt,
    }
  }
}
