import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Optional } from '@/core/optional'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { SupplierProps } from '../../enterprise/entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers.repository'

type DeleteSupplierUseCaseRequest = Optional<
  SupplierProps,
  'createdAt' | 'updatedAt'
> & {
  id: UniqueEntityID
}

type DeleteSupplierUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

export class DeleteSupplierUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute(
    params: DeleteSupplierUseCaseRequest,
  ): Promise<DeleteSupplierUseCaseResponse> {
    const supplierExists = await this.suppliersRepository.findById(params.id)

    if (!supplierExists) {
      return left(new ResourceNotFoundError())
    }

    await this.suppliersRepository.delete(supplierExists)

    return right(null)
  }
}
