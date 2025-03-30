import { PaginationParams } from '@/core/pagination-params'
import { Product } from '../../enterprise/entities/product'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { FindManyResponse } from '@/core/find-many-response'

export abstract class ProductsRepository {
  abstract findById(id: UniqueEntityID): Promise<Product | null>
  abstract findByName(
    name: string,
    params?: PaginationParams,
  ): Promise<FindManyResponse<Product>>
  abstract findAll(params: PaginationParams): Promise<FindManyResponse<Product>>
  abstract create(product: Product): Promise<void>
  abstract save(product: Product): Promise<void>
  abstract delete(product: Product): Promise<void>
}
