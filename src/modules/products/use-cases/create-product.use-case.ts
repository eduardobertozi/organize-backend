import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ProductsRepository } from '../products.repository'
import { Product } from '../product.entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface CreateProductUseCaseRequest {
  name: string
  price: number
  reference: string
  supplierId: UniqueEntityID
}

type CreateProductUseCaseResponse = Either<AlreadyExistsError, null>

export class CreateProductUseCase {
  constructor(private readonly servantRepository: ProductsRepository) {}

  async execute(
    params: CreateProductUseCaseRequest,
  ): Promise<CreateProductUseCaseResponse> {
    const product = Product.create(params)
    const servantExists = await this.servantRepository.findByName(product.name)

    if (!servantExists || servantExists.length > 0) {
      return left(new AlreadyExistsError())
    }

    await this.servantRepository.create(product)

    return right(null)
  }
}
