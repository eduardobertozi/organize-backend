import { Either, right } from '@/core/either'
import { SuppliersRepository } from '../repositories/suppliers.repository'
import { Supplier } from '../../enterprise/entities/supplier'
import { Injectable } from '@nestjs/common'
import { PaginationResponse } from '@/core/pagination-response'

interface FetchAllSuppliersUseCaseRequest {
  page?: number
  q?: string
}

type FetchAllSuppliersUseCaseResponse = Either<
  null,
  PaginationResponse & {
    suppliers: Supplier[]
  }
>

@Injectable()
export class FetchAllSuppliersUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute({
    page = 1,
    q,
  }: FetchAllSuppliersUseCaseRequest): Promise<FetchAllSuppliersUseCaseResponse> {
    const { total, suppliers } = await this.suppliersRepository.findAll({
      page,
      q,
    })

    const paginationResponse = PaginationResponse.create({
      total,
      page,
    })

    return right({
      ...paginationResponse,
      total,
      suppliers,
    })
  }
}
