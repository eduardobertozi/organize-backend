import { UniqueEntityID } from '@/core/unique-entity-id'
import { Prisma, ServantProduct as PrismaServantProduct } from '@prisma/client'
import { ServantProduct } from '@/domain/servant-products/entreprise/entities/servant-product'

export class PrismaServantProductsMapper {
  static toDomain(raw: PrismaServantProduct): ServantProduct {
    return ServantProduct.create(
      {
        productId: raw.productId,
        servantId: raw.servantId,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    servant: ServantProduct,
  ): Prisma.ServantProductUncheckedCreateInput {
    return {
      id: servant.id.toString(),
      productId: servant.productId,
      servantId: servant.servantId,
    }
  }
}
