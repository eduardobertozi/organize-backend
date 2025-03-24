import { faker } from '@faker-js/faker'
import {
  Servant,
  ServantProps,
} from '@/domain/servants/enterprise/entities/servant'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeServant(
  override: Partial<ServantProps> = {},
  id?: UniqueEntityID,
) {
  return Servant.create(
    {
      name: faker.lorem.sentence(),
      price: faker.number.float(),
      products: [],
      productsPrice: faker.number.float(),
      profitPercent: faker.number.int(),
      workForcePrice: faker.number.int(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class ServantsFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaServant(
    override: Partial<ServantProps> = {},
    id?: UniqueEntityID,
  ) {
    const servant = makeServant(override, id)

    return this.prisma.servant.create({
      data: {
        name: servant.name,
        price: servant.price,
        profitPercent: servant.profitPercent,
        workForcePrice: servant.workForcePrice,
      },
    })
  }
}
