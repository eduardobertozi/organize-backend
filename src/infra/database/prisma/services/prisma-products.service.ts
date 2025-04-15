import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import {
  FindManyProductsResponse,
  ProductsRepository,
} from '@/domain/products/application/repositories/products.repository'
import { Product } from '@/domain/products/enterprise/entities/product'
import { PrismaProductMapper } from '../mappers/prisma-products.mapper'
import { PaginationParams } from '@/core/pagination-params'
import { ProductsAttachmentsRepository } from '@/domain/products/application/repositories/product-attachments.repository'
import { UniqueEntityID } from '@/core/unique-entity-id'

@Injectable()
export class PrismaProductsService implements ProductsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsAttachmentsRepository: ProductsAttachmentsRepository,
  ) {}

  async findById(id: UniqueEntityID): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id.toString(),
      },
      include: { attachments: true },
    })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        name,
      },
      include: { attachments: true },
    })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async findBySupplierId(supplierId: UniqueEntityID): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        supplierId: supplierId.toString(),
      },
    })

    return products.map((product) => PrismaProductMapper.toDomain(product))
  }

  async findAll({
    page = 1,
    q,
  }: PaginationParams): Promise<FindManyProductsResponse> {
    const [total, products] = await this.prisma.$transaction([
      this.prisma.product.count(),
      this.prisma.product.findMany({
        where: {
          name: {
            contains: q,
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * 10,
        take: 10,
        include: { attachments: true },
      }),
    ])

    return {
      total,
      products: products.map((product) =>
        PrismaProductMapper.toDomain(product),
      ),
    }
  }

  async create(product: Product): Promise<void> {
    await this.prisma.product.create({
      data: PrismaProductMapper.toPrisma(product),
    })

    await this.productsAttachmentsRepository.createMany(
      product.attachments.getItems(),
    )
  }

  async save(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await Promise.all([
      this.prisma.product.update({
        where: {
          id: product.id.toString(),
        },
        data,
      }),
      this.productsAttachmentsRepository.createMany(
        product.attachments.getNewItems(),
      ),
      this.productsAttachmentsRepository.deleteMany(
        product.attachments.getRemovedItems(),
      ),
    ])
  }

  async delete(product: Product): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: product.id.toString(),
      },
    })
  }
}
