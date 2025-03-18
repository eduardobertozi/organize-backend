import { UniqueEntityID } from '@/core/unique-entity-id'
import { Product } from './product.entity'

export abstract class ProductsRepository {
  abstract findById(id: UniqueEntityID): Promise<Product | null>
  abstract findByName(name: string, page?: number): Promise<Product[]>
  abstract findAll(page: number): Promise<Product[]>
  abstract create(product: Product): Promise<void>
  abstract save(product: Product): Promise<void>
  abstract delete(product: Product): Promise<void>
}
