import { UniqueEntityID } from '@/core/unique-entity-id'
import { Product } from '../product.entity'
import { ProductsRepository } from '../products.repository'

export class InMemoryProductsRepository extends ProductsRepository {
  public items: Product[] = []

  async findById(id: UniqueEntityID) {
    return this.items.find((item) => item.id.equals(id)) ?? null
  }

  async findByName(name: string, page = 1) {
    const filteredItems = this.items.filter((item) => item.name?.includes(name))
    return filteredItems.slice((page - 1) * 10, page * 10)
  }

  async findAll(page = 1) {
    return this.items.slice((page - 1) * 10, page * 10)
  }

  async create(product: Product) {
    this.items.push(product)
  }

  async save(product: Product): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(product.id))

    if (index !== -1) {
      this.items[index] = product
    }
  }

  async delete(product: Product): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(product.id))

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
