import { ServantProductsRepository } from '@/domain/servants/application/repositories/servant-products.repository'
import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'

export class InMemoryServantProductsRepository extends ServantProductsRepository {
  public items: ServantProduct[] = []

  async findUniqueByServantId(
    servantId: string,
  ): Promise<ServantProduct | null> {
    return Promise.resolve(
      this.items.find((item) => item.servantId.toString() === servantId) ??
        null,
    )
  }

  async fetchAllByServantId(servantId: string): Promise<ServantProduct[]> {
    return Promise.resolve(
      this.items.filter((item) => item.servantId.toString() === servantId),
    )
  }

  async create(servantProduct: ServantProduct): Promise<void> {
    await Promise.resolve(this.items.push(servantProduct))
  }

  async delete(servantProduct: ServantProduct): Promise<void> {
    const item = this.items.findIndex((item) =>
      item.id.equals(servantProduct.id),
    )

    await Promise.resolve(this.items.splice(item, 1))
  }
}
