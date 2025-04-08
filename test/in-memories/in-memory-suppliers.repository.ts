import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { SuppliersRepository } from '@/domain/suppliers/application/repositories/suppliers.repository'
import { Supplier } from '@/domain/suppliers/enterprise/entities/supplier'

export class InMemorySuppliersRepository extends SuppliersRepository {
  public items: Supplier[] = []

  async findById(id: UniqueEntityID) {
    return Promise.resolve(
      this.items.find((item) => item.id.equals(id)) ?? null,
    )
  }

  async findByName(name: string) {
    return Promise.resolve(
      this.items.find((item) => item.name === name) ?? null,
    )
  }

  async findAll({ page, q }: PaginationParams) {
    const filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(q?.toLowerCase() ?? ''),
    )

    const start = (page - 1) * 10
    const end = start + 10

    const paginatedItems = filteredItems.slice(start, end)

    return Promise.resolve({
      total: filteredItems.length,
      suppliers: paginatedItems,
    })
  }

  async create(supplier: Supplier) {
    await Promise.resolve(this.items.push(supplier))
  }

  async save(supplier: Supplier): Promise<void> {
    const index = this.items.findIndex((item) => item.id === supplier.id)

    if (index !== -1) {
      await Promise.resolve((this.items[index] = supplier))
    }
  }

  async delete(supplier: Supplier): Promise<void> {
    const index = this.items.findIndex((item) => item.id === supplier.id)

    if (index !== -1) {
      await Promise.resolve(this.items.splice(index, 1))
    }
  }
}
