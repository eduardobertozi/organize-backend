import { Either, right } from '@/core/either'
import { Supplier } from '../../enterprise/entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers.repository'
import { Injectable } from '@nestjs/common'

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

@Injectable()
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
