import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServantsRepository } from '@/domain/sales/application/repositories/sale-servants.repository'
import {
  FindManySalesResponse,
  SalesRepository,
} from '@/domain/sales/application/repositories/sales.repository'
import { Sale } from '@/domain/sales/enterprise/entities/sale'

export class InMemorySalesRepository implements SalesRepository {
  public items: Sale[] = []

  constructor(
    private readonly saleServantsRepository: SaleServantsRepository,
  ) {}

  async findById(id: UniqueEntityID): Promise<Sale | null> {
    return Promise.resolve(
      this.items.find((item) => item.id.equals(id)) ?? null,
    )
  }

  async findAll({ page, q }: PaginationParams): Promise<FindManySalesResponse> {
    let sales: Sale[] = this.items.slice((page - 1) * 10, page * 10)

    if (q) {
      sales = this.items.filter((item) =>
        item.description.toLowerCase().includes(q.toLowerCase()),
      )
    }

    return Promise.resolve({
      sales,
      total: this.items.length,
    })
  }

  async create(sale: Sale): Promise<Sale> {
    this.items.push(sale)
    await this.saleServantsRepository.createMany(sale.servants?.getItems())

    return Promise.resolve(sale)
  }

  async save(sale: Sale): Promise<Sale> {
    const index = this.items.findIndex((item) => item.id === sale.id)
    this.items[index] = sale

    await this.saleServantsRepository?.createMany(sale.servants?.getNewItems())
    await this.saleServantsRepository?.deleteMany(
      sale.servants?.getRemovedItems(),
    )

    return Promise.resolve(sale)
  }

  async delete(sale: Sale): Promise<void> {
    await Promise.resolve(
      (this.items = this.items.filter((item) => item.id !== sale.id)),
    )
  }
}
