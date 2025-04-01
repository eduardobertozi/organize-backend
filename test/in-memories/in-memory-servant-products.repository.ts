import { UniqueEntityID } from '@/core/unique-entity-id'
import { ServantProductsRepository } from '@/domain/servant-products/application/repositories/servant-products.repository'
import { ServantProduct } from '@/domain/servant-products/entreprise/entities/servant-product'

export class InMemoryServantProductsRepository extends ServantProductsRepository {
  public items: ServantProduct[] = []

  async findServantProduct({
    productId,
    servantId,
  }: {
    productId: UniqueEntityID
    servantId: UniqueEntityID
  }): Promise<ServantProduct | null> {
    return Promise.resolve(
      this.items.find(
        (item) =>
          item.productId === productId.toString() &&
          item.servantId === servantId.toString(),
      ) ?? null,
    )
  }

  async fetchAllByServantId(
    servantId: UniqueEntityID,
  ): Promise<ServantProduct[]> {
    return Promise.resolve(
      this.items.filter((item) => item.servantId === servantId.toString()),
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
