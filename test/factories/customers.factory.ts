import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  Customer,
  CustomerProps,
} from '@/domain/customers/enterprise/entities/customer.entity'
import { faker } from '@faker-js/faker'

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

// @Injectable()
// export class CustomersFactory {
//   constructor(private readonly prisma: PrismaService) {}

//   async makePrismaCustomer(
//     override: Partial<CustomerProps> = {},
//     id?: UniqueEntityID,
//   ) {
//     const Customer = makeCustomer(override, id)

//     await this.prisma.user.create({
//       data: PrismaCustomerMapper.toPrisma(Customer),
//     })

//     return Customer
//   }
// }
