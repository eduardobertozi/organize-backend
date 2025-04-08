import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Sale } from '../../enterprise/entities/sale'
import { SalesRepository } from '../repositories/sales.repository'
import { PaginationResponse } from '@/core/pagination-response'

interface FetchAllSalesUseCaseRequest {
  q?: string
  page: number
}

type FetchAllSalesUseCaseResponse = Either<
  null,
  PaginationResponse & {
    sales: Sale[]
  }
>

@Injectable()
export class FetchAllSalesUseCase {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute({
    page,
    q,
  }: FetchAllSalesUseCaseRequest): Promise<FetchAllSalesUseCaseResponse> {
    const { total, sales } = await this.salesRepository.findAll({ q, page })

    const paginationResponse = PaginationResponse.create({
      total,
      page,
    })

    return right({
      ...paginationResponse,
      total,
      sales,
    })
  }
}
