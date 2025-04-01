import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { SaleServantsRepository } from '../repositories/sale-servants.repository'

interface DeleteSaleServantUseCaseRequest {
  servantId: string
  saleId: string
}

type DeleteSaleServantUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteSaleServantUseCase {
  constructor(private saleServantsRepository: SaleServantsRepository) {}

  async execute({
    servantId,
    saleId,
  }: DeleteSaleServantUseCaseRequest): Promise<DeleteSaleServantUseCaseResponse> {
    const saleServant = await this.saleServantsRepository.findSaleServant({
      servantId: new UniqueEntityID(servantId),
      saleId: new UniqueEntityID(saleId),
    })

    if (!saleServant) {
      return left(new ResourceNotFoundError())
    }

    await this.saleServantsRepository.delete(saleServant)

    return right(null)
  }
}
