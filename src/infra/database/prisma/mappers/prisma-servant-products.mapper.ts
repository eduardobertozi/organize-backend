import { UniqueEntityID } from '@/core/unique-entity-id'
import { Prisma, ServantProducts as PrismaServantProduct } from '@prisma/client'
import { ServantProduct } from '@/domain/servant-products/entreprise/entities/servant-product'

export class PrismaServantProductsMapper {
  static toDomain(raw: PrismaServantProduct): ServantProduct {
    return ServantProduct.create(
      {
        productId: raw.productId,
        servantId: raw.servantId,
      },
      new UniqueEntityID(),
    )
  }

  static toPrisma(
    servant: ServantProduct,
  ): Prisma.ServantProductsUncheckedCreateInput {
    return {
      productId: servant.productId,
      servantId: servant.servantId,
    }
  }
}
