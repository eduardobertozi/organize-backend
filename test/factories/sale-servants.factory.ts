import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServant } from '@/domain/sale-servants/enterprise/entities/sale-servant'
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

// @Injectable()
// export class SalesFactory {
//   constructor(private readonly prismaService: PrismaService) {}

//   async makePrismaSales(data: Partial<SaleProps> = {}): Promise<Sale> {
//     const sale = makeSale(data)

//     // await this.prismaService.sale.create({
//     //   data: PrismaSaleMapper.toPrisma(sale),
//     // })

//     return sale
//   }
// }
