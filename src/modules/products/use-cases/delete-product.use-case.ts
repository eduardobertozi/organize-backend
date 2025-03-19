import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'

import { ProductsRepository } from '../repositories/products.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Optional } from '@/core/optional'
import { ProductProps } from '../entities/product'
import { UniqueEntityID } from '@/core/unique-entity-id'

type DeleteProductUseCaseRequest = Optional<
  ProductProps,
  'createdAt' | 'updatedAt'
> & {
  id: UniqueEntityID
}

type DeleteProductUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

export class DeleteProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    params: DeleteProductUseCaseRequest,
  ): Promise<DeleteProductUseCaseResponse> {
    const productExists = await this.productsRepository.findById(params.id)

    if (!productExists) {
      return left(new ResourceNotFoundError())
    }

    await this.productsRepository.delete(productExists)

    return right(null)
  }
}
