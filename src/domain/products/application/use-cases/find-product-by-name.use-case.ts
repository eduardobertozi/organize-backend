import { Either, right } from '@/core/either'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'
import { Injectable } from '@nestjs/common'
import { PaginationResponse } from '@/core/pagination-response'

interface FindProductByNameUseCaseRequest {
  name: string
  page?: number
}

type FindProductByNameUseCaseResponse = Either<
  null,
  PaginationResponse & {
    products: Product[]
  }
>

@Injectable()
export class FindProductByNameUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    name,
    page = 1,
  }: FindProductByNameUseCaseRequest): Promise<FindProductByNameUseCaseResponse> {
    const { products, total } = await this.productsRepository.findByName(name, {
      page,
    })

    const paginationResponse = PaginationResponse.create({
      total,
      page,
    })

    return right({
      ...paginationResponse,
      total,
      products,
    })
  }
}
