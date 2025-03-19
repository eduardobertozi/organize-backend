import { PrismaService } from '@/infrastructure/database/prisma.service'
import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../repositories/products.repository'
import { Product } from '../entities/product'
import { PrismaProductMapper } from './prisma-products.mapper'
import { PaginationParams } from '@/core/pagination-params'

@Injectable()
export class PrismaProductService implements ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async findByName(
    name: string,
    params?: PaginationParams,
  ): Promise<Product[]> {
    const page = params?.page ?? 1

    const products = await this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: (page - 1) * 10,
      take: 10,
    })

    return products.map((product) => PrismaProductMapper.toDomain(product))
  }

  async findAll({ page = 1 }: PaginationParams): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      skip: (page - 1) * 10,
      take: 10,
    })

    return products.map((product) => PrismaProductMapper.toDomain(product))
  }

  async create(product: Product): Promise<void> {
    await this.prisma.product.create({
      data: PrismaProductMapper.toPrisma(product),
    })
  }

  async save(product: Product): Promise<void> {
    await this.prisma.product.update({
      where: {
        id: product.id.toString(),
      },
      data: PrismaProductMapper.toPrisma(product),
    })
  }

  async delete(product: Product): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: product.id.toString(),
      },
    })
  }
}
