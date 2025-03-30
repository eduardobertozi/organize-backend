import { PaginationParams } from '@/core/pagination-params'
import { Product } from '../../enterprise/entities/product'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface FindManyProductsResponse {
  total: number
  products: Product[]
}

export abstract class ProductsRepository {
  abstract findById(id: UniqueEntityID): Promise<Product | null>
  abstract findByName(
    name: string,
    params?: PaginationParams,
  ): Promise<FindManyProductsResponse>
  abstract findAll(params: PaginationParams): Promise<FindManyProductsResponse>
  abstract create(product: Product): Promise<void>
  abstract save(product: Product): Promise<void>
  abstract delete(product: Product): Promise<void>
}
