import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { SaleServant } from '../../enterprise/entities/sale-servant'
import { SaleServantsRepository } from '../repositories/sale-servants.repository'

interface FindSaleServantByIdUseCaseRequest {
  servantId: string
  saleId: string
}

type FindSaleServantByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    saleServant: SaleServant
  }
>

@Injectable()
export class FindSaleServantByIdUseCase {
  constructor(private saleServantsRepository: SaleServantsRepository) {}

  async execute({
    servantId,
    saleId,
  }: FindSaleServantByIdUseCaseRequest): Promise<FindSaleServantByIdUseCaseResponse> {
    const saleServant = await this.saleServantsRepository.findSaleServant({
      servantId: new UniqueEntityID(servantId),
      saleId: new UniqueEntityID(saleId),
    })

    if (!saleServant) {
      return left(new ResourceNotFoundError())
    }

    return right({
      saleServant,
    })
  }
}
