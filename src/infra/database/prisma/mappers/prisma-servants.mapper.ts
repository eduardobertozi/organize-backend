import { UniqueEntityID } from '@/core/unique-entity-id'
import { Prisma, Servant as PrismaServant, Product } from '@prisma/client'
import { Servant } from '@/domain/servants/enterprise/entities/servant'
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
        products: raw.products.map((product) =>
          PrismaProductMapper.toDomain(product),
        ),
        productsPrice: raw.products.reduce(
          (acc, product) => acc + product.price,
          0,
        ),
        profitPercent: raw.profitPercent,
        workForcePrice: raw.workForcePrice,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(servant: Servant): Prisma.ServantCreateInput {
    return {
      id: servant.id.toString(),
      name: servant.name,
      price: servant.price,
      profitPercent: servant.profitPercent,
      workForcePrice: servant.workForcePrice,
    }
  }
}
