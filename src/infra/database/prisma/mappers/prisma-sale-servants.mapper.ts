import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServant } from '@/domain/sale-servants/enterprise/entities/sale-servant'
import { Prisma, SaleServants as PrismaSaleServant } from '@prisma/client'

export class PrismaSaleServantsMapper {
  static toDomain(raw: PrismaSaleServant): SaleServant {
    return SaleServant.create(
      {
        saleId: raw.saleId,
        servantId: raw.servantId,
      },
      new UniqueEntityID(),
    )
  }

  static toPrisma(sale: SaleServant): Prisma.SaleServantsUncheckedCreateInput {
    return {
      saleId: sale.saleId,
      servantId: sale.servantId,
    }
  }
}
