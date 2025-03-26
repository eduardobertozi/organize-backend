import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { SaleServant } from '../../enterprise/entities/sale-servant'
import { SaleServantsRepository } from '../repositories/sale-servants.repository'

interface FindSaleServantBySaleIdUseCaseRequest {
  saleId: string
}

type FindSaleServantBySaleIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    saleServants: SaleServant[]
  }
>

@Injectable()
export class FindSaleServantBySaleIdUseCase {
  constructor(private saleServantsRepository: SaleServantsRepository) {}

  async execute({
    saleId,
  }: FindSaleServantBySaleIdUseCaseRequest): Promise<FindSaleServantBySaleIdUseCaseResponse> {
    const saleServants = await this.saleServantsRepository.findBySaleId(
      new UniqueEntityID(saleId),
    )

    if (saleServants.length < 1) {
      return left(new ResourceNotFoundError())
    }

    return right({
      saleServants,
    })
  }
}
