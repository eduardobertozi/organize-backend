import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface FindProductByIdUseCaseRequest {
  productId: string
}

type FindProductByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

@Injectable()
export class FindProductByIdUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    productId,
  }: FindProductByIdUseCaseRequest): Promise<FindProductByIdUseCaseResponse> {
    const product = await this.productsRepository.findById(
      new UniqueEntityID(productId),
    )

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    return right({
      product,
    })
  }
}
