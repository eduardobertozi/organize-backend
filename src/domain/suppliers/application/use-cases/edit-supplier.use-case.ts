import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Optional } from '@/core/optional'
import { SupplierProps } from '../../enterprise/entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers.repository'

type EditSupplierUseCaseRequest = Optional<
  SupplierProps,
  'createdAt' | 'updatedAt'
> & {
  id: UniqueEntityID
}

type EditSupplierUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

export class EditSupplierUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute(
    params: EditSupplierUseCaseRequest,
  ): Promise<EditSupplierUseCaseResponse> {
    const supplier = await this.suppliersRepository.findById(params.id)

    if (!supplier) {
      return left(new ResourceNotFoundError())
    }

    const newNameBelongsToAnotherExistandSupplier =
      await this.suppliersRepository.findByName(params.name)

    if (newNameBelongsToAnotherExistandSupplier.length > 0) {
      return left(new AlreadyExistsError())
    }

    supplier.name = params.name
    supplier.phone = params.phone
    supplier.email = params.email
    supplier.address = params.address
    supplier.city = params.city
    supplier.state = params.state

    await this.suppliersRepository.save(supplier)

    return right(null)
  }
}
