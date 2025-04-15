import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductsAttachmentsRepository } from '@/domain/products/application/repositories/product-attachments.repository'
import {
  FindManyProductsResponse,
  ProductsRepository,
} from '@/domain/products/application/repositories/products.repository'
import { Product } from '@/domain/products/enterprise/entities/product'

export class InMemoryProductsRepository extends ProductsRepository {
  public items: Product[] = []

  constructor(
    private readonly productAttachmentsRepository?: ProductsAttachmentsRepository,
  ) {
    super()
  }

  async findById(id: UniqueEntityID) {
    return Promise.resolve(
      this.items.find((item) => item.id.equals(id)) ?? null,
    )
  }

  async findByName(name: string): Promise<Product | null> {
    return Promise.resolve(
      this.items.find((item) => item.name === name) ?? null,
    )
  }

  async findBySupplierId(supplierId: UniqueEntityID) {
    return Promise.resolve(
      this.items.filter((item) => item.supplierId?.equals(supplierId)) ?? [],
    )
  }

  async findAll({
    page = 1,
    q,
  }: PaginationParams): Promise<FindManyProductsResponse> {
    let products: Product[] = this.items.slice((page - 1) * 10, page * 10)

    if (q) {
      products = this.items.filter((item) =>
        item.name.toLowerCase().includes(q.toLowerCase()),
      )
    }

    return Promise.resolve({
      products,
      total: this.items.length,
    })
  }

  async create(product: Product) {
    await Promise.resolve(this.items.push(product))

    await this.productAttachmentsRepository?.createMany(
      product.attachments.getItems(),
    )
  }

  async save(product: Product): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(product.id))

    if (index !== -1) {
      await Promise.resolve((this.items[index] = product))
    }

    await this.productAttachmentsRepository?.createMany(
      product.attachments.getNewItems(),
    )

    await this.productAttachmentsRepository?.deleteMany(
      product.attachments.getRemovedItems(),
    )
  }

  async delete(product: Product): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(product.id))

    if (index !== -1) {
      await Promise.resolve(this.items.splice(index, 1))
    }

    await this.productAttachmentsRepository?.deleteManyByProductId(product.id)
  }
}
