import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductsRepository } from '../products.repository'
import { Optional } from '@/core/optional'
import { ProductProps } from '../product.entity'

type EditProductUseCaseRequest = Optional<
  ProductProps,
  'createdAt' | 'updatedAt'
> & {
  id: UniqueEntityID
}

type EditProductUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

export class EditProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    params: EditProductUseCaseRequest,
  ): Promise<EditProductUseCaseResponse> {
    const productExists = await this.productsRepository.findById(params.id)

    if (!productExists) {
      return left(new ResourceNotFoundError())
    }

    const newNameBelongsToAnotherExistandProduct =
      await this.productsRepository.findByName(params.name)

    if (newNameBelongsToAnotherExistandProduct.length > 0) {
      return left(new AlreadyExistsError())
    }

    productExists.name = params.name
    productExists.price = params.price
    productExists.reference = params.reference
    productExists.supplierId = params.supplierId

    await this.productsRepository.save(productExists)

    return right(null)
  }
}
