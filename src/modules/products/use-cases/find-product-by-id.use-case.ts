import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Product } from '../entities/product'
import { ProductsRepository } from '../repositories/products.repository'

interface FindProductByIdUseCaseRequest {
  productId: string
}

type FindProductByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

export class FindProductByIdUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    productId,
  }: FindProductByIdUseCaseRequest): Promise<FindProductByIdUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    return right({
      product,
    })
  }
}
