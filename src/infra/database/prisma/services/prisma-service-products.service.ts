import { ServantProductsRepository } from '@/domain/servants/application/repositories/servant-products.repository'
import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'
import { Injectable } from '@nestjs/common'
import { PrismaServantProductsMapper } from '../mappers/prisma-servant-products.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaServantProductsService implements ServantProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUniqueByServantId(
    servantId: string,
  ): Promise<ServantProduct | null> {
    const servantProduct = await this.prisma.servantProduct.findFirst({
      where: {
        servantId,
      },
    })

    if (!servantProduct) {
      return null
    }

    return PrismaServantProductsMapper.toDomain(servantProduct)
  }

  async fetchAllByServantId(servantId: string): Promise<ServantProduct[]> {
    const servantProducts = await this.prisma.servantProduct.findMany({
      where: {
        servantId,
      },
    })

    return servantProducts.map((servantProduct) =>
      PrismaServantProductsMapper.toDomain(servantProduct),
    )
  }

  async create(servantProduct: ServantProduct): Promise<void> {
    await this.prisma.servantProduct.create({
      data: {
        servantId: servantProduct.servantId,
        productId: servantProduct.productId,
      },
    })
  }

  async delete(servantProduct: ServantProduct): Promise<void> {
    await this.prisma.servantProduct.delete({
      where: {
        id: servantProduct.id.toString(),
      },
    })
  }
}
