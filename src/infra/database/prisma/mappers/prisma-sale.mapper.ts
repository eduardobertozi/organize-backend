import { UniqueEntityID } from '@/core/unique-entity-id'
import { Sale } from '@/domain/sales/enterprise/entities/sale'
import { Prisma, Sale as PrismaSale } from '@prisma/client'

export class PrismaSaleMapper {
  static toDomain(raw: PrismaSale): Sale {
    return Sale.create(
      {
        amount: raw.amount,
        description: raw.description,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(servant: Sale): Prisma.SaleUncheckedCreateInput {
    return {
      id: servant.id.toString(),
      amount: servant.amount,
      description: servant.description,
    }
  }
}
