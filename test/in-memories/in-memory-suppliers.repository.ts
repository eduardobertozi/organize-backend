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

  async findByName(name: string, params?: PaginationParams) {
    const page = params?.page ?? 1

    const filteredItems = this.items.filter((item) => item.name?.includes(name))
    return Promise.resolve(filteredItems.slice((page - 1) * 10, page * 10))
  }

  async findAll({ page }: PaginationParams) {
    return Promise.resolve(this.items.slice((page - 1) * 10, page * 10))
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
