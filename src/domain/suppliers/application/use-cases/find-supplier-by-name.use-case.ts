import { Either, left, right } from '@/core/either'
import { Supplier } from '../../enterprise/entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers.repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface FindSupplierByNameUseCaseRequest {
  name: string
}

type FindSupplierByNameUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    supplier: Supplier
  }
>

@Injectable()
export class FindSupplierByNameUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute({
    name,
  }: FindSupplierByNameUseCaseRequest): Promise<FindSupplierByNameUseCaseResponse> {
    const supplier = await this.suppliersRepository.findByName(name)

    if (!supplier) {
      return left(new ResourceNotFoundError())
    }

    return right({
      supplier,
    })
  }
}
