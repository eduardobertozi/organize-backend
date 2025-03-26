import { SalesRepository } from '@/domain/sales/application/repositories/sales.repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Sale } from '@/domain/sales/enterprise/entities/sale'
import { PrismaSaleMapper } from '../mappers/prisma-sale.mapper'

@Injectable()
export class PrismaSalesService implements SalesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UniqueEntityID): Promise<Sale | null> {
    const sale = await this.prisma.sale.findUnique({
      where: {
        id: id.toString(),
      },
    })

    if (!sale) {
      return null
    }

    return PrismaSaleMapper.toDomain(sale)
  }

  async findAll({ page }: PaginationParams): Promise<Sale[]> {
    const sales = await this.prisma.sale.findMany({
      take: 10,
      skip: (page - 1) * 10,
    })

    return sales.map((sale) => PrismaSaleMapper.toDomain(sale))
  }

  async create(sale: Sale): Promise<Sale> {
    const saleData = PrismaSaleMapper.toPrisma(sale)

    const createdSale = await this.prisma.sale.create({
      data: saleData,
    })

    return PrismaSaleMapper.toDomain(createdSale)
  }

  async save(sale: Sale): Promise<Sale> {
    const saleData = PrismaSaleMapper.toPrisma(sale)

    const updatedSale = await this.prisma.sale.update({
      where: {
        id: sale.id.toString(),
      },
      data: saleData,
    })

    return PrismaSaleMapper.toDomain(updatedSale)
  }

  async delete(sale: Sale): Promise<void> {
    await this.prisma.sale.delete({
      where: {
        id: sale.id.toString(),
      },
    })
  }
}
