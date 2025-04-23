import { UniqueEntityID } from '@/core/unique-entity-id'
import { Sale, SaleProps } from '@/domain/sales/enterprise/entities/sale'
import { SaleServantList } from '@/domain/sales/enterprise/entities/sale-servant-list'
import { PrismaSaleMapper } from '@/infra/database/prisma/mappers/prisma-sale.mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeSale(
  override: Partial<SaleProps> = {},
  id?: UniqueEntityID,
) {
  return Sale.create(
    {
      description: faker.lorem.sentence(),
      amount: faker.number.float(),
      servants: new SaleServantList(),
      customerId: new UniqueEntityID(faker.string.uuid()),
      ...override,
    },
    id,
  )
}

@Injectable()
export class SalesFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaSale(data: Partial<SaleProps> = {}): Promise<Sale> {
    const sale = makeSale(data)

    await this.prismaService.sale.create({
      data: PrismaSaleMapper.toPrisma(sale),
    })

    return sale
  }
}
