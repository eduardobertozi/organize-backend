import { Either, right } from '@/core/either'
import { Supplier } from '../supplier.entity'
import { SuppliersRepository } from '../suppliers.repository'

interface FetchAllSuppliersUseCaseRequest {
  page?: number
}

type FetchAllSuppliersUseCaseResponse = Either<
  null,
  {
    suppliers: Supplier[]
  }
>

export class FetchAllSuppliersUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute({
    page = 1,
  }: FetchAllSuppliersUseCaseRequest): Promise<FetchAllSuppliersUseCaseResponse> {
    const suppliers = await this.suppliersRepository.findAll(page)

    return right({
      suppliers,
    })
  }
}
