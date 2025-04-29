import {
  FindManyProductsResponse,
  SuppliersRepository,
} from '@/domain/suppliers/application/repositories/suppliers.repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Supplier } from '@/domain/suppliers/enterprise/entities/supplier'
import { PrismaSuppliersMapper } from '../mappers/prisma-suppliers.mapper'
import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'

@Injectable()
export class PrismaSuppliersService implements SuppliersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UniqueEntityID): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findUnique({
      where: {
        id: id.toString(),
      },
    })

    if (!supplier) {
      return null
    }

    return PrismaSuppliersMapper.toDomain(supplier)
  }

  async findByName(name: string): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findFirst({
      where: {
        name,
      },
    })

    if (!supplier) {
      return null
    }

    return PrismaSuppliersMapper.toDomain(supplier)
  }

  async findAll({
    page,
    q,
  }: PaginationParams): Promise<FindManyProductsResponse> {
    const [total, suppliers] = await this.prisma.$transaction([
      this.prisma.servant.count(),
      this.prisma.supplier.findMany({
        take: 10,
        where: {
          name: {
            contains: q,
            mode: 'insensitive',
          },
        },
        skip: ((page ?? 1) - 1) * 10,
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return {
      total: total,
      suppliers: suppliers.map((supplier) =>
        PrismaSuppliersMapper.toDomain(supplier),
      ),
    }
  }

  async create(supplier: Supplier): Promise<void> {
    await this.prisma.supplier.create({
      data: PrismaSuppliersMapper.toPrisma(supplier),
    })
  }

  async save(supplier: Supplier): Promise<void> {
    await this.prisma.supplier.update({
      where: {
        id: supplier.id.toString(),
      },
      data: PrismaSuppliersMapper.toPrisma(supplier),
    })
  }

  async delete(supplier: Supplier): Promise<void> {
    await this.prisma.supplier.delete({
      where: {
        id: supplier.id.toString(),
      },
    })
  }
}
