import { Either, right } from '@/core/either'
import { Product } from '../entities/product'
import { ProductsRepository } from '../products.repository'

interface FetchAllProductsUseCaseRequest {
  page?: number
}

type FetchAllProductsUseCaseResponse = Either<
  null,
  {
    products: Product[]
  }
>

export class FetchAllProductsUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    page = 1,
  }: FetchAllProductsUseCaseRequest): Promise<FetchAllProductsUseCaseResponse> {
    const products = await this.productsRepository.findAll(page)

    return right({
      products,
    })
  }
}
