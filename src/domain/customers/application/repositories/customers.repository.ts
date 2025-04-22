import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Customer } from '../../enterprise/entities/customer.entity'

export interface FindManyCustomersResponse {
  total: number
  customers: Customer[]
}

export abstract class CustomersRepository {
  abstract findAll({
    page,
    q,
  }: PaginationParams): Promise<FindManyCustomersResponse>
  abstract findById(id: UniqueEntityID): Promise<Customer | null>
  abstract findByUserId(userId: UniqueEntityID): Promise<Customer | null>
  abstract create(customer: Customer): Promise<Customer>
  abstract save(customer: Customer): Promise<Customer>
  abstract delete(customer: Customer): Promise<void>
}
