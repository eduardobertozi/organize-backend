import { PaginationParams } from '@/core/pagination-params'
import {
  FindManyServantsResponse,
  ServantsRepository,
} from '@/domain/servants/application/repositories/servants.repository'
import { Servant } from '@/domain/servants/enterprise/entities/servant'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaServantMapper } from '../mappers/prisma-servants.mapper'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ServantProductsRepository } from '@/domain/servants/application/repositories/servant-products.repository'

@Injectable()
export class PrismaServantsService implements ServantsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly servantProductsRepository: ServantProductsRepository,
  ) {}

  async findById(id: UniqueEntityID): Promise<Servant | null> {
    const servant = await this.prisma.servant.findUnique({
      where: {
        id: id.toString(),
      },
      include: {
        products: {
          select: {
            product: {
              select: { id: true, price: true, name: true },
            },
          },
        },
      },
    })

    if (!servant) {
      return null
    }

    const formattedServant = {
      ...servant,
      products: servant.products.map((product) => ({
        id: product.product.id,
        price: product.product.price,
        name: product.product.name,
      })),
    }

    return PrismaServantMapper.toDomain(formattedServant)
  }

  async findByName(name: string): Promise<Servant | null> {
    const servant = await this.prisma.servant.findFirst({
      where: {
        name,
      },
      include: {
        products: {
          select: {
            product: {
              select: { id: true, price: true, name: true },
            },
          },
        },
      },
    })

    if (!servant) {
      return null
    }

    const formattedServant = {
      ...servant,
      products: servant.products.map((product) => ({
        id: product.product.id,
        price: product.product.price,
        name: product.product.name,
      })),
    }

    return PrismaServantMapper.toDomain(formattedServant)
  }

  async findAll({
    page,
    q,
  }: PaginationParams): Promise<FindManyServantsResponse> {
    const [total, servants] = await this.prisma.$transaction([
      this.prisma.servant.count(),
      this.prisma.servant.findMany({
        take: 10,
        where: {
          name: {
            contains: q,
            mode: 'insensitive',
          },
        },
        skip: (page ?? 1 - 1) * 10,
        include: {
          products: {
            select: {
              product: {
                select: { id: true, price: true, name: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    const formattedServants = servants.map((servant) => ({
      ...servant,
      products: servant.products.map((product) => ({
        id: product.product.id,
        price: product.product.price,
        name: product.product.name,
      })),
    }))

    return {
      total: total,
      servants: formattedServants.map((servant) =>
        PrismaServantMapper.toDomain(servant),
      ),
    }
  }

  async create(servant: Servant): Promise<Servant> {
    await this.prisma.servant.create({
      data: PrismaServantMapper.toPrisma(servant),
    })

    await this.servantProductsRepository.createMany(servant.products.getItems())

    return servant
  }

  async save(servant: Servant): Promise<Servant> {
    await this.prisma.servant.update({
      where: {
        id: servant.id.toString(),
      },
      data: PrismaServantMapper.toPrisma(servant),
    })

    return servant
  }

  async delete(servant: Servant): Promise<void> {
    await this.prisma.servant.delete({
      where: {
        id: servant.id.toString(),
      },
    })
  }
}
