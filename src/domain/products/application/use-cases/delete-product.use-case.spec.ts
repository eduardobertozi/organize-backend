import { UniqueEntityID } from '@/core/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { DeleteProductUseCase } from './delete-product.use-case'
import { InMemoryProductsRepository } from 'test/in-memories/in-memory-products.repository'
import { makeProduct } from 'test/factories/products.factory'

describe('Delete Product', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: DeleteProductUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new DeleteProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to delete a existant product', async () => {
    const product = makeProduct({}, new UniqueEntityID('1'))

    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items).toHaveLength(0)
  })

  it('should not be able delete him when this does not exist', async () => {
    const result = await sut.execute({
      productId: '1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
