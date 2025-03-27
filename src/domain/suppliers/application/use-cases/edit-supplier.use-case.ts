import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { SuppliersRepository } from '../repositories/suppliers.repository'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Supplier } from '../../enterprise/entities/supplier'

interface EditSupplierUseCaseRequest {
  supplierId: string
  name: string
  phone: string
  email: string
  address: string
  city: string
  state: string
}

type EditSupplierUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  {
    supplier: Supplier
  }
>

@Injectable()
export class EditSupplierUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute(
    params: EditSupplierUseCaseRequest,
  ): Promise<EditSupplierUseCaseResponse> {
    const supplier = await this.suppliersRepository.findById(
      new UniqueEntityID(params.supplierId),
    )

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

    return right({
      supplier,
    })
  }
}
