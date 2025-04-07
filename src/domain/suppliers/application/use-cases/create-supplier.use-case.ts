import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { Supplier } from '../../enterprise/entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers.repository'
import { Injectable } from '@nestjs/common'

interface CreateSupplierUseCaseRequest {
  name: string
  email: string
  phone: string
  city: string
  state: string
  address: string
}

type CreateSupplierUseCaseResponse = Either<
  AlreadyExistsError,
  {
    supplier: Supplier
  }
>

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

    if (supplierExists) {
      return left(new AlreadyExistsError())
    }

    await this.suppliersRepository.create(supplier)

    return right({
      supplier,
    })
  }
}
