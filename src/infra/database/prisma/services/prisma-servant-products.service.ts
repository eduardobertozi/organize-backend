import { PaginationParams } from '@/core/pagination-params'
import { ServantProductsRepository } from '@/domain/servants/application/repositories/servant-products.repository'
import { ServantProduct } from '@/domain/servants/enterprise/entities/servant-product'
import { PrismaService } from '../prisma.service'
import { PrismaServantProductsMapper } from '../mappers/prisma-servant-products.mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaServantProductsService implements ServantProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ServantProduct | null> {
    const servantProduct = await this.prisma.servantProduct.findUnique({
      where: {
        id,
      },
    })

    if (!servantProduct) {
      return null
    }

    return PrismaServantProductsMapper.toDomain(servantProduct)
  }

  async findManyByServantId(
    servantId: string,
    params: PaginationParams,
  ): Promise<ServantProduct[]> {
    const page = params.page ?? 1

    const servantProducts = await this.prisma.servantProduct.findMany({
      where: { servantId },
      skip: (page - 1) * 10,
      take: 10,
    })

    return servantProducts.map((servantProduct) =>
      PrismaServantProductsMapper.toDomain(servantProduct),
    )
  }

  async create(servantProduct: ServantProduct): Promise<void> {
    await this.prisma.servantProduct.create({
      data: PrismaServantProductsMapper.toPrisma(servantProduct),
    })
  }

  async delete(servantProduct: ServantProduct): Promise<void> {
    await this.prisma.servantProduct.delete({
      where: { id: servantProduct.id.toString() },
    })
  }
}
