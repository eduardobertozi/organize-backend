import { Either, right } from '@/core/either'
import { Supplier } from '../supplier.entity'
import { SuppliersRepository } from '../suppliers.repository'

interface FindSupplierByNameUseCaseRequest {
  name: string
  page?: number
}

type FindSupplierByNameUseCaseResponse = Either<
  null,
  {
    suppliers: Supplier[]
  }
>

export class FindSupplierByNameUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute({
    name,
    page = 1,
  }: FindSupplierByNameUseCaseRequest): Promise<FindSupplierByNameUseCaseResponse> {
    const suppliers = await this.suppliersRepository.findByName(name, page)

    return right({
      suppliers,
    })
  }
}
