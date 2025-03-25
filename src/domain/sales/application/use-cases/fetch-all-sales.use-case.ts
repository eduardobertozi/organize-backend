import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Sale } from '../../enterprise/entities/sale'
import { SalesRepository } from '../repositories/sales.repository'

interface FetchAllSalesUseCaseRequest {
  page: number
}

type FetchAllSalesUseCaseResponse = Either<
  null,
  {
    sales: Sale[]
  }
>

@Injectable()
export class FetchAllSalesUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute({
    page,
  }: FetchAllSalesUseCaseRequest): Promise<FetchAllSalesUseCaseResponse> {
    const sales = await this.salesRepository.findAll({ page })

    return right({
      sales,
    })
  }
}
