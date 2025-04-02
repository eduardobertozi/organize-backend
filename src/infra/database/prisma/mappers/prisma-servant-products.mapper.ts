import { UniqueEntityID } from '@/core/unique-entity-id'
import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'
import { Prisma, ServantProducts as PrismaServantProduct } from '@prisma/client'

export class PrismaServantProductsMapper {
  static toDomain(raw: PrismaServantProduct): ServantProduct {
    return ServantProduct.create(
      {
        productId: new UniqueEntityID(raw.productId),
        servantId: new UniqueEntityID(raw.servantId),
      },
      new UniqueEntityID(),
    )
  }

  static toPrisma(
    servant: ServantProduct,
  ): Prisma.ServantProductsUncheckedCreateInput {
    return {
      productId: servant.productId.toString(),
      servantId: servant.servantId.toString(),
    }
  }
}
