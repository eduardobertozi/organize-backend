import { PaginationParams } from '@/core/pagination-params'
import { Supplier } from '../../enterprise/entities/supplier'

export abstract class SuppliersRepository {
  abstract findById(id: string): Promise<Supplier | null>
  abstract findByName(
    name: string,
    params?: PaginationParams,
  ): Promise<Supplier[]>
  abstract findAll(params: PaginationParams): Promise<Supplier[]>
  abstract create(supplier: Supplier): Promise<void>
  abstract save(supplier: Supplier): Promise<void>
  abstract delete(supplier: Supplier): Promise<void>
}
