import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from '@/domain/servants/enterprise/entities/servant'
import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'
import { ServantProductsList } from '@/domain/servants/enterprise/entities/servant-products-list'
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
        products: new ServantProductsList(
          raw.products.map((product) =>
            ServantProduct.create({
              productId: new UniqueEntityID(product.id),
              servantId: new UniqueEntityID(raw.id),
            }),
          ),
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

  static toPrisma(servant: Servant): Prisma.ServantUncheckedCreateInput {
    return {
      id: servant.id.toString(),
      name: servant.name,
      price: servant.price,
      profitPercent: servant.profitPercent,
      workForcePrice: servant.workForcePrice,
    }
  }
}
