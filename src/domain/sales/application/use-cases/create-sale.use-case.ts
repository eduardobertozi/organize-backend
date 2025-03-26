import { Injectable } from '@nestjs/common'
import { SalesRepository } from '../repositories/sales.repository'
import { Sale } from '../../enterprise/entities/sale'
import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'

interface CreateSaleUseCaseRequest {
  description?: string | null
  amount: number
}

type CreateSaleUseCaseResponse = Either<
  AlreadyExistsError,
  {
    sale: Sale
  }
>

@Injectable()
export class CreateSaleUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(
    params: CreateSaleUseCaseRequest,
  ): Promise<CreateSaleUseCaseResponse> {
    const createSale = Sale.create(params)
    const saleExists = await this.salesRepository.findById(createSale.id)

    if (saleExists) {
      return left(new AlreadyExistsError())
    }

    const sale = await this.salesRepository.create(createSale)

    return right({
      sale,
    })
  }
}
