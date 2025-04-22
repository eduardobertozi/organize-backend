import { UniqueEntityID } from '@/core/unique-entity-id'
import { Customer } from '@/domain/customers/enterprise/entities/customer.entity'
import { Prisma, User as PrismaCustomer } from '@prisma/client'

export class PrismaCustomerMapper {
  static toDomain(raw: PrismaCustomer): Customer {
    return Customer.create(
      {
        name: raw.name,
        phone: raw.phone,
        email: raw.email,
        address: raw.address,
        city: raw.city,
        state: raw.state,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    customer: Customer,
  ): Partial<Prisma.UserUncheckedCreateInput> {
    return {
      id: customer.id.toString(),
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      state: customer.state,
    }
  }
}
