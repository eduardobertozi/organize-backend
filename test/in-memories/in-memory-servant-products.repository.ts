import { UniqueEntityID } from '@/core/unique-entity-id'
import { ServantProductsRepository } from '@/domain/servants/application/repositories/servant-products.repository'
import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'

export class InMemoryServantProductsRepository extends ServantProductsRepository {
  public items: ServantProduct[] = []

  async createMany(servantProducts: ServantProduct[]): Promise<void> {
    if (!servantProducts) return

    await Promise.resolve(this.items.push(...servantProducts))
  }

  async deleteMany(servantProducts: ServantProduct[]): Promise<void> {
    const servantProductsIds = servantProducts.map((servantProduct) =>
      servantProduct.id.toValue(),
    )

    await Promise.resolve(
      (this.items = this.items.filter(
        (item) => !servantProductsIds.includes(item.id.toValue()),
      )),
    )
  }

  async findManyByServantId(
    servantId: UniqueEntityID,
  ): Promise<ServantProduct[]> {
    return Promise.resolve(
      this.items.filter((item) => item.servantId.equals(servantId)),
    )
  }

  async deleteManyByServantId(servantId: UniqueEntityID): Promise<void> {
    await Promise.resolve(
      (this.items = this.items.filter(
        (item) => !item.servantId.equals(servantId),
      )),
    )
  }
}
