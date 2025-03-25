import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { SalesRepository } from '../repositories/sales.repository'

interface DeleteSaleUseCaseRequest {
  saleId: string
}

type DeleteSaleUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteSaleUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute({
    saleId,
  }: DeleteSaleUseCaseRequest): Promise<DeleteSaleUseCaseResponse> {
    const sale = await this.salesRepository.findById(new UniqueEntityID(saleId))

    if (!sale) {
      return left(new ResourceNotFoundError())
    }

    await this.salesRepository.delete(sale)

    return right(null)
  }
}
