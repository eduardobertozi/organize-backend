import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { SaleServant } from '../../enterprise/entities/sale-servant'
import { SaleServantsRepository } from '../repositories/sale-servants.repository'

interface FetchAllSaleServantsBySaleIdUseCaseRequest {
  saleId: string
}

type FetchAllSaleServantsBySaleIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    saleServants: SaleServant[]
  }
>

@Injectable()
export class FetchAllSaleServantsBySaleIdUseCase {
  constructor(private saleServantsRepository: SaleServantsRepository) {}

  async execute({
    saleId,
  }: FetchAllSaleServantsBySaleIdUseCaseRequest): Promise<FetchAllSaleServantsBySaleIdUseCaseResponse> {
    const saleServants = await this.saleServantsRepository.fetchAllBySaleId(
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
