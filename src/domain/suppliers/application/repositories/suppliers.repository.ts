import { UniqueEntityID } from '@/core/unique-entity-id'
import { Supplier } from '../../enterprise/entities/supplier'

export abstract class SuppliersRepository {
  abstract findById(id: UniqueEntityID): Promise<Supplier | null>
  abstract findByName(name: string, page?: number): Promise<Supplier[]>
  abstract findAll(page: number): Promise<Supplier[]>
  abstract create(supplier: Supplier): Promise<void>
  abstract save(supplier: Supplier): Promise<void>
  abstract delete(supplier: Supplier): Promise<void>
}
