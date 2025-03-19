import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { Optional } from '@/core/optional'
import { Supplier, SupplierProps } from '../../enterprise/entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers.repository'
import { Injectable } from '@nestjs/common'

type CreateSupplierUseCaseRequest = Optional<
  SupplierProps,
  'createdAt' | 'updatedAt'
>

type CreateSupplierUseCaseResponse = Either<AlreadyExistsError, null>

@Injectable()
export class CreateSupplierUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute(
    params: CreateSupplierUseCaseRequest,
  ): Promise<CreateSupplierUseCaseResponse> {
    const supplier = Supplier.create(params)
    const supplierExists = await this.suppliersRepository.findByName(
      supplier.name,
    )

    if (!supplierExists || supplierExists.length > 0) {
      return left(new AlreadyExistsError())
    }

    await this.suppliersRepository.create(supplier)

    return right(null)
  }
}
