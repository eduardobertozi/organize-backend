import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { SaleServant } from '../../enterprise/entities/sale-servant'
import { SaleServantsRepository } from '../repositories/sale-servants.repository'

interface FindSaleServantByIdUseCaseRequest {
  saleServantId: string
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
    saleServantId,
  }: FindSaleServantByIdUseCaseRequest): Promise<FindSaleServantByIdUseCaseResponse> {
    const saleServant = await this.saleServantsRepository.findById(
      new UniqueEntityID(saleServantId),
    )

    if (!saleServant) {
      return left(new ResourceNotFoundError())
    }

    return right({
      saleServant,
    })
  }
}
