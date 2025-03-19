import { PaginationParams } from '@/core/pagination-params'
import { Product } from '../../enterprise/entities/product'

export abstract class ProductsRepository {
  abstract findById(id: string): Promise<Product | null>
  abstract findByName(
    name: string,
    params?: PaginationParams,
  ): Promise<Product[]>
  abstract findAll(params: PaginationParams): Promise<Product[]>
  abstract create(product: Product): Promise<void>
  abstract save(product: Product): Promise<void>
  abstract delete(product: Product): Promise<void>
}
