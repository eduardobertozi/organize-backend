import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ProductsRepository } from '../repositories/products.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface DeleteProductUseCaseRequest {
  productId: string
}

type DeleteProductUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    productId,
  }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productsRepository.findById(
      new UniqueEntityID(productId),
    )

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    await this.productsRepository.delete(product)

    return right(null)
  }
}
