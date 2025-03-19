import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Supplier } from '../../enterprise/entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers.repository'
import { Injectable } from '@nestjs/common'

interface FindSupplierByIdUseCaseRequest {
  id: UniqueEntityID
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
    id,
  }: FindSupplierByIdUseCaseRequest): Promise<FindSupplierByIdUseCaseResponse> {
    const supplier = await this.suppliersRepository.findById(id)

    if (!supplier) {
      return left(new ResourceNotFoundError())
    }

    return right({
      supplier,
    })
  }
}
