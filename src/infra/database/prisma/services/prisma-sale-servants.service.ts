import { SaleServantsRepository } from '@/domain/sale-servants/application/repositories/sale-servants.repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServant } from '@/domain/sale-servants/enterprise/entities/sale-servant'
import { PrismaSaleServantsMapper } from '../mappers/prisma-sale-servants.mapper'

@Injectable()
export class PrismaSaleServantsService implements SaleServantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UniqueEntityID): Promise<SaleServant | null> {
    const saleServant = await this.prisma.saleServant.findUnique({
      where: {
        id: id.toString(),
      },
    })

    if (!saleServant) {
      return null
    }

    return PrismaSaleServantsMapper.toDomain(saleServant)
  }

  async findBySaleId(saleId: UniqueEntityID): Promise<SaleServant[]> {
    const saleServants = await this.prisma.saleServant.findMany({
      where: {
        saleId: saleId.toString(),
      },
    })

    return saleServants.map((saleServant) =>
      PrismaSaleServantsMapper.toDomain(saleServant),
    )
  }

  async create(saleServant: SaleServant): Promise<SaleServant> {
    const createdSaleServant = await this.prisma.saleServant.create({
      data: PrismaSaleServantsMapper.toPrisma(saleServant),
    })

    return PrismaSaleServantsMapper.toDomain(createdSaleServant)
  }

  async delete(saleServant: SaleServant): Promise<void> {
    await this.prisma.saleServant.delete({
      where: {
        id: saleServant.id.toString(),
      },
    })
  }
}
