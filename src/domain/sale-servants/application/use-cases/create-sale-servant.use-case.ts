import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { SaleServant } from '../../enterprise/entities/sale-servant'
import { SaleServantsRepository } from '../repositories/sale-servants.repository'
import { SalesRepository } from '@/domain/sales/application/repositories/sales.repository'
import { ServantsRepository } from '@/domain/servants/application/repositories/servants.repository'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface CreateSaleServantUseCaseRequest {
  saleId: string
  servantId: string
}

type CreateSaleServantUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    saleServant: SaleServant
  }
>

@Injectable()
export class CreateSaleServantUseCase {
  constructor(
    private servantsRepository: ServantsRepository,
    private salesRepository: SalesRepository,
    private saleServantsRepository: SaleServantsRepository,
  ) {}

  async execute(
    params: CreateSaleServantUseCaseRequest,
  ): Promise<CreateSaleServantUseCaseResponse> {
    const servant = await this.servantsRepository.findById(
      new UniqueEntityID(params.servantId),
    )

    const sale = await this.salesRepository.findById(
      new UniqueEntityID(params.saleId),
    )

    if (!servant || !sale) {
      return left(new ResourceNotFoundError())
    }

    const saleServant = await this.saleServantsRepository.create(
      SaleServant.create(params),
    )

    return right({
      saleServant,
    })
  }
}
