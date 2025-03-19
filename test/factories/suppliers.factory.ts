import { UniqueEntityID } from '@/core/unique-entity-id'
import { Supplier } from '@/domain/suppliers/enterprise/entities/supplier'
import { faker } from '@faker-js/faker'

export function makeSupplier(
  override: Partial<Supplier> = {},
  id?: UniqueEntityID,
) {
  return Supplier.create(
    {
      name: faker.commerce.productName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      city: faker.location.city(),
      state: faker.location.state(),
      address: faker.location.streetAddress(),
      ...override,
    },
    id,
  )
}
