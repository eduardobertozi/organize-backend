import { Either, right } from '@/core/either'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'
import { Injectable } from '@nestjs/common'
import { PaginationResponse } from '@/core/pagination-response'

interface FetchAllProductsUseCaseRequest {
  page?: number
  q?: string
}

type FetchAllProductsUseCaseResponse = Either<
  null,
  PaginationResponse & {
    products: Product[]
  }
>

@Injectable()
export class FetchAllProductsUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    page = 1,
    q,
  }: FetchAllProductsUseCaseRequest): Promise<FetchAllProductsUseCaseResponse> {
    const { products, total } = await this.productsRepository.findAll({
      page,
      q,
    })

    const paginationResponse = PaginationResponse.create({
      total,
      page,
    })

    return right({
      ...paginationResponse,
      products,
    })
  }
}
