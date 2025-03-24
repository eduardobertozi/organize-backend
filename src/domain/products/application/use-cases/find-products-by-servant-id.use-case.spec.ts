import { makeProduct } from 'test/factories/products.factory'
import { InMemoryProductsRepository } from 'test/in-memories/in-memory-products.repository'
import { FindProductsByServantIdUseCase } from './find-products-by-servant-id.use-case'
import { makeServant } from 'test/factories/servants.factory'
import { UniqueEntityID } from '@/core/unique-entity-id'

describe('FindProductsByServantIdUseCase', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: FindProductsByServantIdUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new FindProductsByServantIdUseCase(inMemoryProductsRepository)
  })

  it('should be able to find products by servant id', async () => {
    const servant = makeServant({}, new UniqueEntityID('servant-id'))

    await inMemoryProductsRepository.create(
      makeProduct({ servantId: servant.id }),
    )

    const result = await sut.execute({
      servantId: 'servant-id',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items).toHaveLength(1)
    expect(inMemoryProductsRepository.items[0].servantId.value).toBe(
      'servant-id',
    )
  })
})
