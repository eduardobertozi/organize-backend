import { faker } from '@faker-js/faker'
import {
  Servant,
  ServantProps,
} from '@/domain/servants/enterprise/entities/servant'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaServantMapper } from '@/infra/database/prisma/mappers/prisma-servants.mapper'
import { ServantProductsList } from '@/domain/servants/enterprise/entities/servant-products-list'

export function makeServant(
  override: Partial<ServantProps> = {},
  id?: UniqueEntityID,
) {
  return Servant.create(
    {
      name: faker.lorem.sentence(),
      products: new ServantProductsList(),
      productsPrice: faker.number.float({
        min: 30,
        max: 40,
        fractionDigits: 2,
      }),
      profitPercent: faker.number.float({
        min: 1,
        max: 50,
        fractionDigits: 2,
      }),
      workForcePrice: faker.number.float({
        min: 20,
        max: 30,
        fractionDigits: 2,
      }),
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

    await this.prisma.servant.create({
      data: PrismaServantMapper.toPrisma(servant),
    })

    return servant
  }
}
