import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { makeServant } from 'test/factories/servants.factory'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { CreateServantUseCase } from './create-servant.use-case'
import { InMemoryServantProductsRepository } from 'test/in-memories/in-memory-servant-products.repository'

describe('Create Servant', () => {
  let inMemoryServantProductsRepository: InMemoryServantProductsRepository
  let inMemoryServantsRepository: InMemoryServantsRepository
  let sut: CreateServantUseCase

  beforeEach(() => {
    inMemoryServantProductsRepository = new InMemoryServantProductsRepository()
    inMemoryServantsRepository = new InMemoryServantsRepository(
      inMemoryServantProductsRepository,
    )
    sut = new CreateServantUseCase(inMemoryServantsRepository)
  })

  it('should be able to create a new servant', async () => {
    const result = await sut.execute({
      name: 'Sample servant',
      productsPrice: 2,
      profitPercent: 48,
      workForcePrice: 25,
      productsIds: ['product-1', 'product-2'],
    })

    if (result.isRight()) {
      expect(result.value.servant).toBeTruthy()
      expect(result.value.servant.products.getItems()).toHaveLength(2)
      expect(inMemoryServantsRepository.items).toHaveLength(1)
      expect(inMemoryServantsRepository.items[0].price).toBe(40)
    }
  })

  it('should not be able create a servant with this already exists', async () => {
    await inMemoryServantsRepository.create(
      makeServant({
        name: 'Sample servant',
      }),
    )

    const result = await sut.execute({
      name: 'Sample servant',
      productsPrice: 2,
      profitPercent: 48,
      workForcePrice: 25,
      productsIds: ['product-1', 'product-2'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
