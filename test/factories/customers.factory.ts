import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  Customer,
  CustomerProps,
} from '@/domain/customers/enterprise/entities/customer.entity'
import { PrismaCustomerMapper } from '@/infra/database/prisma/mappers/prisma-customers.mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeCustomer(
  override: Partial<CustomerProps> = {},
  id?: UniqueEntityID,
) {
  return Customer.create(
    {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      userId: new UniqueEntityID(faker.string.uuid()),
      ...override,
    },
    id,
  )
}

@Injectable()
export class CustomersFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaCustomer(
    override: Partial<CustomerProps> = {},
    id?: UniqueEntityID,
  ) {
    const customer = makeCustomer(override, id)

    await this.prisma.user.create({
      data: {
        name: customer.name,
        username: faker.internet.username(),
        password: faker.internet.password(),
        ...PrismaCustomerMapper.toPrisma(customer),
      },
    })

    return customer
  }
}
