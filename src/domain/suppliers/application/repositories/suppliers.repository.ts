import { PaginationParams } from '@/core/pagination-params'
import { Supplier } from '../../enterprise/entities/supplier'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface FindManyProductsResponse {
  total: number
  suppliers: Supplier[]
}

export abstract class SuppliersRepository {
  abstract findById(id: UniqueEntityID): Promise<Supplier | null>
  abstract findByName(name: string): Promise<Supplier | null>
  abstract findAll(params: PaginationParams): Promise<FindManyProductsResponse>
  abstract create(supplier: Supplier): Promise<void>
  abstract save(supplier: Supplier): Promise<void>
  abstract delete(supplier: Supplier): Promise<void>
}
