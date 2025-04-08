import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServantsRepository } from '@/domain/sales/application/repositories/sale-servants.repository'
import { SaleServant } from '@/domain/sales/enterprise/entities/sale-servant'
import { Injectable } from '@nestjs/common'
import { PrismaSaleServantsMapper } from '../mappers/prisma-sale-servants.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaSaleServantsService implements SaleServantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(saleServants: SaleServant[]): Promise<void> {
    const saleServantsData = saleServants.map((saleServant) =>
      PrismaSaleServantsMapper.toPrisma(saleServant),
    )

    await this.prisma.saleServants.createMany({
      data: saleServantsData,
    })
  }

  async deleteMany(saleServants: SaleServant[]): Promise<void> {
    const saleServantsIds = saleServants.map((saleServant) =>
      PrismaSaleServantsMapper.toPrisma(saleServant),
    )

    await this.prisma.saleServants.deleteMany({
      where: {
        OR: saleServantsIds,
      },
    })
  }

  async findManyBySaleId(saleId: UniqueEntityID): Promise<SaleServant[]> {
    const saleServants = await this.prisma.saleServants.findMany({
      where: {
        saleId: saleId.toString(),
      },
    })

    return saleServants.map((saleServant) =>
      PrismaSaleServantsMapper.toDomain(saleServant),
    )
  }

  async deleteManyBySaleId(saleId: UniqueEntityID): Promise<void> {
    await this.prisma.saleServants.deleteMany({
      where: {
        saleId: saleId.toString(),
      },
    })
  }
}
