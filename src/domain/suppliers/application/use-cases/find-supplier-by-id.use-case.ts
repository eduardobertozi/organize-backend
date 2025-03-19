import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { Supplier } from '../../enterprise/entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers.repository'

interface FindSupplierByIdUseCaseRequest {
  supplierId: string
}

type FindSupplierByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    supplier: Supplier
  }
>

@Injectable()
export class FindSupplierByIdUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute({
    supplierId,
  }: FindSupplierByIdUseCaseRequest): Promise<FindSupplierByIdUseCaseResponse> {
    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      return left(new ResourceNotFoundError())
    }

    return right({
      supplier,
    })
  }
}
