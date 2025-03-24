import { PaginationParams } from '@/core/pagination-params'
import { ProductsAttachmentsRepository } from '@/domain/products/application/repositories/product-attachments.repository'
import { ProductsRepository } from '@/domain/products/application/repositories/products.repository'
import { Product } from '@/domain/products/enterprise/entities/product'

export class InMemoryProductsRepository extends ProductsRepository {
  public items: Product[] = []

  constructor(
    private readonly productAttachmentsRepository?: ProductsAttachmentsRepository,
  ) {
    super()
  }

  async findById(id: string) {
    return Promise.resolve(
      this.items.find((item) => item.id.toString() === id) ?? null,
    )
  }

  async findByName(name: string, params?: PaginationParams) {
    const page = params?.page ?? 1
    const filteredItems = this.items.filter((item) => item.name?.includes(name))
    return Promise.resolve(filteredItems.slice((page - 1) * 10, page * 10))
  }

  async findByServantId(servantId: string): Promise<Product[]> {
    return Promise.resolve(
      this.items.filter((item) => item.servantId.toString() === servantId),
    )
  }

  async findAll({ page = 1 }: PaginationParams) {
    return Promise.resolve(this.items.slice((page - 1) * 10, page * 10))
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

    await this.productAttachmentsRepository?.deleteManyByProductId(
      product.id.toString(),
    )
  }
}
