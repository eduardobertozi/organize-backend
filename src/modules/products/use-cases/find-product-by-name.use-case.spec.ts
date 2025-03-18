import { InMemoryProductsRepository } from '../test/in-memory-products.repository'
import { makeProduct } from '../test/products.factory'
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

  it('should be able to find for several products with similar name', async () => {
    await Promise.all([
      inMemoryProductsRepository.create(
        makeProduct({
          name: 'Sample product',
        }),
      ),
      inMemoryProductsRepository.create(
        makeProduct({
          name: 'Sample product 2',
        }),
      ),
      inMemoryProductsRepository.create(
        makeProduct({
          name: 'Sample product 3',
        }),
      ),
    ])

    const result = await sut.execute({
      name: 'Sample product',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items).toHaveLength(3)
  })

  it('should be able to find paginated products', async () => {
    const tasks: Promise<void>[] = []

    for (let i = 0; i < 12; i++) {
      tasks.push(
        inMemoryProductsRepository.create(
          makeProduct({
            name: `Sample product ${i}`,
          }),
        ),
      )
    }

    await Promise.all(tasks)

    const result = await sut.execute({
      name: 'Sample product',
      page: 2,
    })

    expect(result.isRight()).toBe(true)

    expect(result.value?.products).toHaveLength(2)
  })
})
