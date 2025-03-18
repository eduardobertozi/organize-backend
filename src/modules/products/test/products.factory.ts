import { UniqueEntityID } from '@/core/unique-entity-id'
import { Product } from '../product.entity'
import { faker } from '@faker-js/faker'

export function makeProduct(
  override: Partial<Product> = {},
  id?: UniqueEntityID,
) {
  return Product.create(
    {
      name: faker.commerce.productName(),
      price: faker.number.float(),
      reference: faker.lorem.word(),
      supplierId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}
