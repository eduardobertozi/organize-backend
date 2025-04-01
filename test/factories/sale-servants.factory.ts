import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  SaleServant,
  SaleServantProps,
} from '@/domain/sale-servants/enterprise/entities/sale-servant'
import { PrismaSaleServantsMapper } from '@/infra/database/prisma/mappers/prisma-sale-servants.mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeSaleServant(
  override: Partial<SaleServant> = {},
  id?: UniqueEntityID,
) {
  return SaleServant.create(
    {
      saleId: faker.string.uuid(),
      servantId: faker.string.uuid(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class SaleServantsFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaSaleServant(
    data: Partial<SaleServantProps> = {},
  ): Promise<SaleServant> {
    const sale = makeSaleServant(data)

    await this.prisma.saleServants.create({
      data: PrismaSaleServantsMapper.toPrisma(sale),
    })

    return sale
  }
}
