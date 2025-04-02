import { Injectable } from '@nestjs/common'
import { PrismaServantProductsMapper } from '../mappers/prisma-servant-products.mapper'
import { PrismaService } from '../prisma.service'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ServantProductsRepository } from '@/domain/servants/application/repositories/servant-products.repository'
import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'

@Injectable()
export class PrismaServantProductsService implements ServantProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(servantProducts: ServantProduct[]): Promise<void> {
    const servantProductsData = servantProducts.map((servantProduct) =>
      PrismaServantProductsMapper.toPrisma(servantProduct),
    )

    await this.prisma.servantProducts.createMany({
      data: servantProductsData,
    })
  }

  async deleteMany(servantProducts: ServantProduct[]): Promise<void> {
    const servantProductsData = servantProducts.map((servantProduct) =>
      PrismaServantProductsMapper.toPrisma(servantProduct),
    )

    await this.prisma.servantProducts.deleteMany({
      where: {
        servantId: servantProductsData[0].servantId,
      },
    })
  }

  async findManyByServantId(
    servantId: UniqueEntityID,
  ): Promise<ServantProduct[]> {
    const servantProducts = await this.prisma.servantProducts.findMany({
      where: {
        servantId: servantId.toString(),
      },
    })

    return servantProducts.map((servantProduct) =>
      PrismaServantProductsMapper.toDomain(servantProduct),
    )
  }

  async deleteManyByServantId(servantId: UniqueEntityID): Promise<void> {
    await this.prisma.servantProducts.deleteMany({
      where: {
        servantId: servantId.toString(),
      },
    })
  }
}
