import { UniqueEntityID } from '@/core/unique-entity-id'
import { Sale } from '@/domain/sales/enterprise/entities/sale'
import { SaleServant } from '@/domain/sales/enterprise/entities/sale-servant'
import { SaleServantList } from '@/domain/sales/enterprise/entities/sale-servant-list'
import {
  Prisma,
  Sale as PrismaSale,
  Servant as PrismaServant,
} from '@prisma/client'

type SaleWithServants = PrismaSale & {
  servants: Pick<PrismaServant, 'id' | 'name' | 'price'>[]
}

export class PrismaSaleMapper {
  static toDomain(raw: SaleWithServants): Sale {
    return Sale.create(
      {
        amount: raw.amount,
        description: raw.description,
        servants: new SaleServantList(
          raw.servants.map((servant) =>
            SaleServant.create({
              saleId: new UniqueEntityID(raw.id),
              servantId: new UniqueEntityID(servant.id),
            }),
          ),
        ),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(sale: Sale): Prisma.SaleUncheckedCreateInput {
    return {
      id: sale.id.toString(),
      amount: sale.amount,
      description: sale.description,
      createdAt: sale.createdAt!,
      updatedAt: sale.updatedAt!,
    }
  }
}
