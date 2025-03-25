import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { SalesRepository } from '@/domain/sales/application/repositories/sales.repository'
import { Sale } from '@/domain/sales/enterprise/entities/sale'

export class InMemorySalesRepository implements SalesRepository {
  public items: Sale[] = []

  async findById(id: UniqueEntityID): Promise<Sale | null> {
    return Promise.resolve(
      this.items.find((item) => item.id.equals(id)) ?? null,
    )
  }

  async findAll({ page }: PaginationParams): Promise<Sale[]> {
    return Promise.resolve(this.items.slice((page - 1) * 10, page * 10))
  }

  async create(sale: Sale): Promise<Sale> {
    this.items.push(sale)
    return Promise.resolve(sale)
  }

  async save(sale: Sale): Promise<Sale> {
    const index = this.items.findIndex((item) => item.id === sale.id)
    this.items[index] = sale
    return Promise.resolve(sale)
  }

  async delete(sale: Sale): Promise<void> {
    await Promise.resolve(
      (this.items = this.items.filter((item) => item.id !== sale.id)),
    )
  }
}
