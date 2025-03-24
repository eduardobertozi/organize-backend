import { UniqueEntityID } from '@/core/unique-entity-id'
import { Prisma, ServantProduct as PrismaServantProduct } from '@prisma/client'
import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'

export class PrismaServantProductsMapper {
  static toDomain(raw: PrismaServantProduct): ServantProduct {
    return ServantProduct.create(
      {
        productId: new UniqueEntityID(raw.productId),
        servantId: new UniqueEntityID(raw.servantId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    servant: ServantProduct,
  ): Prisma.ServantProductUncheckedCreateInput {
    return {
      productId: servant.productId.toString(),
      servantId: servant.servantId.toString(),
    }
  }
}
