import { InMemoryProductsRepository } from '../test/in-memory-products.repository'
import { makeProduct } from '../test/products.factory'
import { FetchAllProductsUseCase } from './fetch-all-products.use-case'

describe('Fetch All Products', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: FetchAllProductsUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new FetchAllProductsUseCase(inMemoryProductsRepository)
  })

  it('should be able to fetch all products', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryProductsRepository.create(makeProduct())
    }

    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)
    expect(result.value?.products).toHaveLength(10)
    expect(result.value?.products[0].id).toBeDefined()
  })

  it('should be able to fetch all products with ten items per page', async () => {
    const createProducts: Promise<void>[] = []

    for (let i = 0; i < 12; i++) {
      createProducts.push(inMemoryProductsRepository.create(makeProduct()))
    }

    await Promise.all(createProducts)

    const result1 = await sut.execute({
      page: 1,
    })

    expect(result1.isRight()).toBe(true)
    expect(result1.value?.products).toHaveLength(10)

    const result2 = await sut.execute({
      page: 2,
    })

    expect(result2.isRight()).toBe(true)
    expect(result2.value?.products).toHaveLength(2)
  })
})
