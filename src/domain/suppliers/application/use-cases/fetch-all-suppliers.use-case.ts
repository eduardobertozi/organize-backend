import { Either, right } from '@/core/either'
import { SuppliersRepository } from '../repositories/suppliers.repository'
import { Supplier } from '../../enterprise/entities/supplier'
import { Injectable } from '@nestjs/common'

interface FetchAllSuppliersUseCaseRequest {
  page?: number
  q?: string
}

type FetchAllSuppliersUseCaseResponse = Either<
  null,
  {
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
    const suppliers = await this.suppliersRepository.findAll({ page, q })

    /* TODO: implement pagination return data */

    return right({
      suppliers,
    })
  }
}
