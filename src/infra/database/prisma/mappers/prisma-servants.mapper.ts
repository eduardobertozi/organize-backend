import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from '@/domain/servants/enterprise/entities/servant'
import { Prisma, Servant as PrismaServant, Product } from '@prisma/client'
import { PrismaProductMapper } from './prisma-products.mapper'

type ServantWithProducts = PrismaServant & {
  products: Product[]
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
        products: raw.products.map((product) =>
          PrismaProductMapper.toDomain(product),
        ),
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
      products: servant.products
        ? {
            create: servant.products.map((product) =>
              PrismaProductMapper.toPrisma(product),
            ),
          }
        : undefined,
      profitPercent: servant.profitPercent,
      workForcePrice: servant.workForcePrice,
    }
  }
}
