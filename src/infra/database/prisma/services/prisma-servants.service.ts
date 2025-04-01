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

@Injectable()
export class PrismaServantsService implements ServantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UniqueEntityID): Promise<Servant | null> {
    const servant = await this.prisma.servant.findUnique({
      where: {
        id: id.toString(),
      },
      include: {
        products: true,
      },
    })

    if (!servant) {
      return null
    }

    return PrismaServantMapper.toDomain(servant)
  }

  async findByName(name: string): Promise<FindManyServantsResponse> {
    const [total, servants] = await this.prisma.$transaction([
      this.prisma.servant.count(),
      this.prisma.servant.findMany({
        where: {
          name,
        },
        include: {
          products: true,
        },
      }),
    ])

    return {
      total: total,
      servants: servants.map((servant) =>
        PrismaServantMapper.toDomain(servant),
      ),
    }
  }

  async findAll({ page }: PaginationParams): Promise<FindManyServantsResponse> {
    const [total, servants] = await this.prisma.$transaction([
      this.prisma.servant.count(),
      this.prisma.servant.findMany({
        take: 10,
        skip: (page - 1) * 10,
        include: {
          products: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])

    return {
      total: total,
      servants: servants.map((servant) =>
        PrismaServantMapper.toDomain(servant),
      ),
    }
  }

  async create(servant: Servant): Promise<Servant> {
    await this.prisma.servant.create({
      data: PrismaServantMapper.toPrisma(servant),
    })

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
