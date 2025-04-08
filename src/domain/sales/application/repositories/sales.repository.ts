import { UniqueEntityID } from '@/core/unique-entity-id'
import { Sale } from '../../enterprise/entities/sale'
import { PaginationParams } from '@/core/pagination-params'

export interface FindManySalesResponse {
  total: number
  sales: Sale[]
}

export abstract class SalesRepository {
  abstract findById(id: UniqueEntityID): Promise<Sale | null>
  abstract findAll(params: PaginationParams): Promise<FindManySalesResponse>
  abstract create(sale: Sale): Promise<Sale>
  abstract save(sale: Sale): Promise<Sale>
  abstract delete(sale: Sale): Promise<void>
}
