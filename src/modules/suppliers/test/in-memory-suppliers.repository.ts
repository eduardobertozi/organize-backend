import { UniqueEntityID } from '@/core/unique-entity-id'
import { SuppliersRepository } from '../suppliers.repository'
import { Supplier } from '../supplier.entity'

export class InMemorySuppliersRepository extends SuppliersRepository {
  public items: Supplier[] = []

  async findById(id: UniqueEntityID) {
    return Promise.resolve(
      this.items.find((item) => item.id.equals(id)) ?? null,
    )
  }

  async findByName(name: string, page = 1) {
    const filteredItems = this.items.filter((item) => item.name?.includes(name))
    return Promise.resolve(filteredItems.slice((page - 1) * 10, page * 10))
  }

  async findAll(page = 1) {
    return Promise.resolve(this.items.slice((page - 1) * 10, page * 10))
  }

  async create(supplier: Supplier) {
    this.items.push(supplier)
    await Promise.resolve()
  }

  async save(supplier: Supplier): Promise<void> {
    const index = this.items.findIndex((item) => item.id === supplier.id)

    if (index !== -1) {
      this.items[index] = supplier
    }

    await Promise.resolve()
  }

  async delete(supplier: Supplier): Promise<void> {
    const index = this.items.findIndex((item) => item.id === supplier.id)

    if (index !== -1) {
      this.items.splice(index, 1)
    }

    await Promise.resolve()
  }
}
