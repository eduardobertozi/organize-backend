import {
  FindManySalesResponse,
  SalesRepository,
} from '@/domain/sales/application/repositories/sales.repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@/core/pagination-params'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Sale } from '@/domain/sales/enterprise/entities/sale'
import { PrismaSaleMapper } from '../mappers/prisma-sale.mapper'
import { SaleServantsRepository } from '@/domain/sales/application/repositories/sale-servants.repository'

@Injectable()
export class PrismaSalesService implements SalesRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly saleServantsRepository: SaleServantsRepository,
  ) {}

  async findById(id: UniqueEntityID): Promise<Sale | null> {
    const sale = await this.prisma.sale.findUnique({
      where: {
        id: id.toString(),
      },
      include: {
        servants: {
          select: {
            servant: {
              select: { id: true, name: true, price: true },
            },
          },
        },
      },
    })

    if (!sale) {
      return null
    }

    const formattedSale = {
      ...sale,
      servants: sale.servants.map(({ servant }) => ({
        id: servant.id,
        price: servant.price,
        name: servant.name,
      })),
    }

    return PrismaSaleMapper.toDomain(formattedSale)
  }

  async findAll({ page }: PaginationParams): Promise<FindManySalesResponse> {
    const [total, sales] = await this.prisma.$transaction([
      this.prisma.sale.count(),
      this.prisma.sale.findMany({
        take: 10,
        skip: (page! - 1) * 10,
        include: {
          servants: {
            select: {
              servant: {
                select: { id: true, name: true, price: true },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])

    const formattedSales = sales.map((sale) => ({
      ...sale,
      servants: sale.servants.map(({ servant }) => ({
        id: servant.id,
        price: servant.price,
        name: servant.name,
      })),
    }))

    return {
      total: total,
      sales: formattedSales.map((sale) => PrismaSaleMapper.toDomain(sale)),
    }
  }

  async create(sale: Sale): Promise<Sale> {
    await this.prisma.sale.create({
      data: PrismaSaleMapper.toPrisma(sale),
    })

    await this.saleServantsRepository.createMany(sale.servants.getItems())

    return sale
  }

  async save(sale: Sale): Promise<Sale> {
    await this.prisma.sale.update({
      where: {
        id: sale.id.toString(),
      },
      data: PrismaSaleMapper.toPrisma(sale),
    })

    return sale
  }

  async delete(sale: Sale): Promise<void> {
    await this.prisma.sale.delete({
      where: {
        id: sale.id.toString(),
      },
    })
  }
}
