import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServant } from '@/domain/sales/enterprise/entities/sale-servant'

import { Prisma, SaleServants as PrismaSaleServant } from '@prisma/client'

export class PrismaSaleServantsMapper {
  static toDomain(raw: PrismaSaleServant): SaleServant {
    return SaleServant.create(
      {
        saleId: new UniqueEntityID(raw.saleId),
        servantId: new UniqueEntityID(raw.servantId),
      },
      new UniqueEntityID(),
    )
  }

  static toPrisma(sale: SaleServant): Prisma.SaleServantsUncheckedCreateInput {
    return {
      saleId: sale.saleId.toString(),
      servantId: sale.servantId.toString(),
    }
  }
}
