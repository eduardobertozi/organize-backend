import { SaleServantsRepository } from '@/domain/sale-servants/application/repositories/sale-servants.repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { SaleServant } from '@/domain/sale-servants/enterprise/entities/sale-servant'
import { PrismaSaleServantsMapper } from '../mappers/prisma-sale-servants.mapper'

@Injectable()
export class PrismaSaleServantsService implements SaleServantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async fetchAllBySaleId(saleId: UniqueEntityID): Promise<SaleServant[]> {
    const saleServants = this.prisma.saleServants.findMany({
      where: {
        saleId: saleId.toString(),
      },
    })

    return saleServants.then((saleServants) =>
      saleServants.map((saleServant) =>
        PrismaSaleServantsMapper.toDomain(saleServant),
      ),
    )
  }

  async findSaleServant({
    servantId,
    saleId,
  }: {
    servantId: UniqueEntityID
    saleId: UniqueEntityID
  }): Promise<SaleServant | null> {
    const saleServant = await this.prisma.saleServants.findUnique({
      where: {
        saleId_servantId: {
          saleId: saleId.toString(),
          servantId: servantId.toString(),
        },
      },
    })

    if (!saleServant) {
      return null
    }

    return PrismaSaleServantsMapper.toDomain(saleServant)
  }

  async create(saleServant: SaleServant): Promise<SaleServant> {
    const createdSaleServant = await this.prisma.saleServants.create({
      data: PrismaSaleServantsMapper.toPrisma(saleServant),
    })

    return PrismaSaleServantsMapper.toDomain(createdSaleServant)
  }

  async delete(saleServant: SaleServant): Promise<void> {
    await this.prisma.saleServants.delete({
      where: {
        saleId_servantId: {
          saleId: saleServant.saleId.toString(),
          servantId: saleServant.servantId.toString(),
        },
      },
    })
  }
}
