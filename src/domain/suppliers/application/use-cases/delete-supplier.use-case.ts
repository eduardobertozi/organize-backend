import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { SuppliersRepository } from '../repositories/suppliers.repository'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductsRepository } from '@/domain/products/application/repositories/products.repository'

interface DeleteSupplierUseCaseRequest {
  supplierId: string
}

type DeleteSupplierUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

@Injectable()
export class DeleteSupplierUseCase {
  constructor(
    private readonly suppliersRepository: SuppliersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute({
    supplierId,
  }: DeleteSupplierUseCaseRequest): Promise<DeleteSupplierUseCaseResponse> {
    const supplierExists = await this.suppliersRepository.findById(
      new UniqueEntityID(supplierId),
    )

    if (!supplierExists) {
      return left(new ResourceNotFoundError())
    }

    await this.productsRepository.removeSupplierFromProducts(supplierExists.id)
    await this.suppliersRepository.delete(supplierExists)

    return right(null)
  }
}
