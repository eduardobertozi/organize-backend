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

  static toPrisma(sale: Sale): Prisma.SaleUncheckedCreateInput {
    return {
      id: sale.id.toString(),
      amount: sale.amount,
      description: sale.description,
    }
  }
}
