import { SuppliersRepository } from '@/domain/suppliers/application/repositories/suppliers.repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Supplier } from '@/domain/suppliers/enterprise/entities/supplier'
import { PrismaSuppliersMapper } from '../mappers/prisma-suppliers.mapper'
import { PaginationParams } from '@/core/pagination-params'

@Injectable()
export class PrismaSuppliersService implements SuppliersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findUnique({
      where: {
        id,
      },
    })

    if (!supplier) {
      return null
    }

    return PrismaSuppliersMapper.toDomain(supplier)
  }

  async findByName(
    name: string,
    params?: PaginationParams,
  ): Promise<Supplier[]> {
    const page = params?.page ?? 1

    const suppliers = await this.prisma.supplier.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: (page - 1) * 10,
      take: 10,
    })

    return suppliers.map((supplier) => PrismaSuppliersMapper.toDomain(supplier))
  }

  async findAll({ page }: PaginationParams): Promise<Supplier[]> {
    const suppliers = await this.prisma.supplier.findMany({
      take: 10,
      skip: (page - 1) * 10,
    })

    return suppliers.map((supplier) => PrismaSuppliersMapper.toDomain(supplier))
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
