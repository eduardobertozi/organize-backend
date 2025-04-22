import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  CustomersRepository,
  FindManyCustomersResponse,
} from '@/domain/customers/application/repositories/customers.repository'
import { Customer } from '@/domain/customers/enterprise/entities/customer.entity'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async findAll({
    page,
    q,
  }: PaginationParams): Promise<FindManyCustomersResponse> {
    if (!q && !page) {
      return Promise.resolve({
        customers: this.items,
        total: this.items.length,
      })
    }

    let customers = this.items.slice(
      page ? (page - 1) * 10 : 0,
      page ? page * 10 : undefined,
    )

    if (q) {
      customers = this.items.filter((item) =>
        item.name.toLowerCase().includes(q.toLowerCase()),
      )
    }

    return Promise.resolve({
      customers,
      total: this.items.length,
    })
  }

  async findById(id: UniqueEntityID): Promise<Customer | null> {
    const customer = this.items.find((item) => item.id.equals(id))

    if (!customer) {
      return null
    }

    return Promise.resolve(customer)
  }

  async findByUserId(userId: UniqueEntityID): Promise<Customer | null> {
    const customer = this.items.find((item) => item.userId?.equals(userId))

    if (!customer) {
      return null
    }

    return Promise.resolve(customer)
  }

  async create(customer: Customer): Promise<Customer> {
    this.items.push(customer)

    return Promise.resolve(customer)
  }

  async save(customer: Customer): Promise<Customer> {
    const customerIndex = this.items.findIndex((item) =>
      item.id.equals(customer.id),
    )

    if (customerIndex === -1) {
      throw new Error('Customer not found')
    }

    this.items[customerIndex] = customer

    return Promise.resolve(customer)
  }

  async delete(customer: Customer): Promise<void> {
    const customerIndex = this.items.findIndex((item) =>
      item.id.equals(customer.id),
    )

    if (customerIndex === -1) {
      throw new Error('Customer not found')
    }

    this.items.splice(customerIndex, 1)

    return Promise.resolve()
  }
}
