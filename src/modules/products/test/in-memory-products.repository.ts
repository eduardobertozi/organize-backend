import { UniqueEntityID } from '@/core/unique-entity-id'
import { Product } from '../entities/product'
import { ProductAttachmentRepository } from '../repositories/product-attachments.repository'
import { ProductsRepository } from '../repositories/products.repository'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryProductsRepository extends ProductsRepository {
  public items: Product[] = []

  constructor(
    private readonly productAttachmentsRepository?: ProductAttachmentRepository,
  ) {
    super()
  }

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

  async create(product: Product) {
    await Promise.resolve(this.items.push(product))

    await this.productAttachmentsRepository?.createMany(
      product.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(product.id)
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

    DomainEvents.dispatchEventsForAggregate(product.id)
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
