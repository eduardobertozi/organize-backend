import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeServant } from 'test/factories/servants.factory'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { EditServantUseCase } from './edit-servant.use-case'
import { InMemoryServantProductsRepository } from 'test/in-memories/in-memory-servant-products.repository'
import { makeProduct } from 'test/factories/products.factory'

describe('Edit Servant', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let inMemoryServantProductsRepository: InMemoryServantProductsRepository
  let sut: EditServantUseCase

  beforeEach(() => {
    inMemoryServantProductsRepository = new InMemoryServantProductsRepository()
    inMemoryServantsRepository = new InMemoryServantsRepository(
      inMemoryServantProductsRepository,
    )
    sut = new EditServantUseCase(
      inMemoryServantsRepository,
      inMemoryServantProductsRepository,
    )
  })

  it('should be able to edit a existant servant', async () => {
    const servant = makeServant({
      name: 'Sample servant',
    })
    const product1 = makeProduct()
    const product2 = makeProduct()

    await inMemoryServantsRepository.create(servant)

    const result = await sut.execute({
      servantId: servant.id.toString(),
      name: 'Sample servant 2',
      productsIds: [product1.id.toString(), product2.id.toString()],
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    if (result.isRight()) {
      expect(result.value.servant).toBeTruthy()
      expect(result.value.servant.products.getItems()).toHaveLength(2)
    }
  })

  it('should not be able edit him when this does not exist', async () => {
    const result = await sut.execute({
      servantId: 'supplier-1',
      name: 'Sample servant',
      productsIds: [],
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able edit servant with a another existant servant name', async () => {
    const servant = makeServant({
      name: 'Sample servant',
    })

    await inMemoryServantsRepository.create(servant)

    await inMemoryServantsRepository.create(
      makeServant({
        name: 'Sample servant 2',
      }),
    )

    const result = await sut.execute({
      servantId: servant.id.toString(),
      name: 'Sample servant 2',
      productsIds: [],
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
