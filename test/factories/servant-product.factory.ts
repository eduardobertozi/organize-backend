import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'

export function makeServantProduct(
  override: Partial<ServantProduct> = {},
  id?: UniqueEntityID,
) {
  return ServantProduct.create(
    {
      productId: new UniqueEntityID(),
      servantId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}

// @Injectable()
// export class ProductsFactory {
//   constructor(private readonly prismaService: PrismaService) {}

//   async makePrismaProducts(data: Partial<ProductProps> = {}): Promise<Product> {
//     const product = makeProduct(data)

//     await this.prismaService.product.create({
//       data: PrismaProductMapper.toPrisma(product),
//     })

//     return product
//   }
// }
