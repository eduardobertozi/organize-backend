import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemoryProductsRepository } from '../test/in-memory-products.repository'
import { makeProduct } from '../test/products.factory'
import { FindProductByIdUseCase } from './find-product-by-id.use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

describe('Find Product By Id', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: FindProductByIdUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new FindProductByIdUseCase(inMemoryProductsRepository)
  })

  it('should be able to find product by id', async () => {
    const product = makeProduct({
      name: 'Sample product',
    })

    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items).toHaveLength(1)
  })

  it('should return error when product not exists', async () => {
    const result = await sut.execute({
      productId: 'product-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
