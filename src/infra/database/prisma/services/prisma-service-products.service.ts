import { ServantProductsRepository } from '@/domain/servant-products/application/repositories/servant-products.repository'
import { ServantProduct } from '@/domain/servant-products/entreprise/entities/servant-product'
import { Injectable } from '@nestjs/common'
import { PrismaServantProductsMapper } from '../mappers/prisma-servant-products.mapper'
import { PrismaService } from '../prisma.service'
import { UniqueEntityID } from '@/core/unique-entity-id'

@Injectable()
export class PrismaServantProductsService implements ServantProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUniqueByServantId(
    servantId: UniqueEntityID,
  ): Promise<ServantProduct | null> {
    const servantProduct = await this.prisma.servantProduct.findFirst({
      where: {
        servantId: servantId.toString(),
      },
    })

    if (!servantProduct) {
      return null
    }

    return PrismaServantProductsMapper.toDomain(servantProduct)
  }

  async fetchAllByServantId(
    servantId: UniqueEntityID,
  ): Promise<ServantProduct[]> {
    const servantProducts = await this.prisma.servantProduct.findMany({
      where: {
        servantId: servantId.toString(),
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
