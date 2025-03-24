import { UniqueEntityID } from '@/core/unique-entity-id'
import { Prisma, Servant as PrismaServant } from '@prisma/client'
import { Servant } from '@/domain/servants/enterprise/entities/servant'

export class PrismaServantMapper {
  static toDomain(raw: PrismaServant): Servant {
    return Servant.create(
      {
        name: raw.name,
        price: raw.price,
        productIds: [],
        productsPrice: 0,
        profitPercent: 0,
        workForcePrice: 0,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(servant: Servant): Prisma.ServantUncheckedCreateInput {
    return {
      id: servant.id.toString(),
      name: servant.name,
      price: servant.price,
    }
  }
}
