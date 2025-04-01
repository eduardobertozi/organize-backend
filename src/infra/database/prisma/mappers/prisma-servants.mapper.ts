import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from '@/domain/servants/enterprise/entities/servant'
import { Prisma, Servant as PrismaServant, Product } from '@prisma/client'

type ServantWithProducts = PrismaServant & {
  products: Pick<Product, 'id' | 'price'>[]
}

export class PrismaServantMapper {
  static toDomain(raw: ServantWithProducts): Servant {
    return Servant.create(
      {
        name: raw.name,
        price: raw.price,
        productsPrice: raw.products.reduce(
          (acc, product) => acc + product.price,
          0,
        ),
        productsIds: raw.products.map((product) => product.id),
        profitPercent: raw.profitPercent,
        workForcePrice: raw.workForcePrice,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(servant: Servant): Prisma.ServantUncheckedCreateInput {
    return {
      id: servant.id.toString(),
      name: servant.name,
      price: servant.price,
      products: {
        connect: servant.productsIds?.map((productId) => ({
          id: productId,
        })),
      },
      profitPercent: servant.profitPercent,
      workForcePrice: servant.workForcePrice,
    }
  }
}
