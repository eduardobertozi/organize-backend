import { makeProduct } from 'test/factories/products.factory'
import { makeServant } from 'test/factories/servants.factory'
import { InMemoryServantProductsRepository } from 'test/in-memories/in-memory-servant-products.repository'
import { CreateServantProductUseCase } from './create-servant-product.use-case'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { InMemoryProductsRepository } from 'test/in-memories/in-memory-products.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

describe('Create Servant Product', () => {
  let inMemoryServantProductsRepository: InMemoryServantProductsRepository
  let inMemoryServantsRepository: InMemoryServantsRepository
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: CreateServantProductUseCase

  beforeEach(() => {
    inMemoryServantProductsRepository = new InMemoryServantProductsRepository()
    inMemoryServantsRepository = new InMemoryServantsRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new CreateServantProductUseCase(
      inMemoryServantProductsRepository,
      inMemoryServantsRepository,
      inMemoryProductsRepository,
    )
  })

  it('should be able to create a new servant product', async () => {
    const servant = makeServant()
    const product = makeProduct()

    await inMemoryServantsRepository.create(servant)
    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      servantId: servant.id.toString(),
      productId: product.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantsRepository.items).toHaveLength(1)

    expect(inMemoryServantProductsRepository.items[0]).toEqual(
      expect.objectContaining({
        servantId: servant.id.toString(),
        productId: product.id.toString(),
      }),
    )
  })

  it('should not be able create new servant when servant or product not exists', async () => {
    const result = await sut.execute({
      servantId: 'servant-id',
      productId: 'product-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
