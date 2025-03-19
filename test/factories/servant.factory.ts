import { faker } from '@faker-js/faker'
import {
  Servant,
  ServantProps,
} from '@/domain/servants/enterprise/entities/servant'
import { UniqueEntityID } from '@/core/unique-entity-id'

export function makeServant(
  override: Partial<ServantProps> = {},
  id?: UniqueEntityID,
) {
  return Servant.create(
    {
      name: faker.lorem.sentence(),
      price: faker.number.float(),
      productIds: [],
      productsPrice: faker.number.float(),
      profitPercent: faker.number.int(),
      workForcePrice: faker.number.int(),
      ...override,
    },
    id,
  )
}
