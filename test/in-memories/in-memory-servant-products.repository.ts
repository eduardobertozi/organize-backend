import { PaginationParams } from '@/core/pagination-params'
import { ServantProductsRepository } from '@/domain/servants/application/repositories/servant-products.repository'
import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'

export class InMemoryServantProductsRepository
  implements ServantProductsRepository
{
  public items: ServantProduct[] = []

  async findById(id: string): Promise<ServantProduct | null> {
    return Promise.resolve(
      this.items.find((item) => item.id.toString() === id) ?? null,
    )
  }

  async findManyByServantId(
    servantId: string,
    params: PaginationParams,
  ): Promise<ServantProduct[]> {
    const page = params.page ?? 1

    const itemsWithProductId = this.items.filter(
      (item) => item.id.toString() === servantId,
    )

    return Promise.resolve(itemsWithProductId.slice((page - 1) * 10, page * 10))
  }

  async create(servantRepository: ServantProduct): Promise<void> {
    await Promise.resolve(this.items.push(servantRepository))
  }

  async delete(servantRepository: ServantProduct): Promise<void> {
    await Promise.resolve(
      this.items.splice(
        this.items.findIndex((item) => item.id === servantRepository.id),
        1,
      ),
    )
  }
}
