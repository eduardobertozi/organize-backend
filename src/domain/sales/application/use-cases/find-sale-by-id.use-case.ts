import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Sale } from '../../enterprise/entities/sale'
import { SalesRepository } from '../repositories/sales.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface FindSaleByIdUseCaseRequest {
  saleId: string
}

type FindSaleByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    sale: Sale
  }
>

@Injectable()
export class FindSaleByIdUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute({
    saleId,
  }: FindSaleByIdUseCaseRequest): Promise<FindSaleByIdUseCaseResponse> {
    const sale = await this.salesRepository.findById(new UniqueEntityID(saleId))

    if (!sale) {
      return left(new ResourceNotFoundError())
    }

    return right({
      sale,
    })
  }
}
