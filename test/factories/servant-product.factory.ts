import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  ServantProduct,
  ServantProductProps,
} from '@/domain/servants/enterprise/entities/servant-product'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeServantProduct(
  override: Partial<ServantProductProps> = {},
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

@Injectable()
export class ServantProductsFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaServantProduct(
    override: Partial<ServantProductProps> = {},
    id?: UniqueEntityID,
  ) {
    const servant = makeServantProduct(override, id)

    const prismaServant = await this.prisma.servantProducts.create({
      data: {
        productId: servant.productId.toString(),
        servantId: servant.servantId.toString(),
      },
    })

    return prismaServant
  }
}
