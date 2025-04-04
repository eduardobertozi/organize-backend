import { InMemoryProductsRepository } from 'test/in-memories/in-memory-products.repository'
import { makeProduct } from 'test/factories/products.factory'
import { FindProductByNameUseCase } from './find-product-by-name.use-case'

describe('Find Product By Name', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: FindProductByNameUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new FindProductByNameUseCase(inMemoryProductsRepository)
  })

  it('should be able to find products by name', async () => {
    const product = makeProduct({
      name: 'Sample product',
    })

    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      name: 'Sample product',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items).toHaveLength(1)
  })
})
