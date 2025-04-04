import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { makeServant } from 'test/factories/servants.factory'
import { FindServantByIdUseCase } from './find-servant-by-id.use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { InMemoryServantProductsRepository } from 'test/in-memories/in-memory-servant-products.repository'

describe('Find Servant By Id', () => {
  let inMemoryServantProductsRepository: InMemoryServantProductsRepository
  let inMemoryServantsRepository: InMemoryServantsRepository
  let sut: FindServantByIdUseCase

  beforeEach(() => {
    inMemoryServantProductsRepository = new InMemoryServantProductsRepository()
    inMemoryServantsRepository = new InMemoryServantsRepository(
      inMemoryServantProductsRepository,
    )
    sut = new FindServantByIdUseCase(inMemoryServantsRepository)
  })

  it('should be able to find servant by id', async () => {
    await inMemoryServantsRepository.create(
      makeServant(
        {
          name: 'Sample servant',
        },
        new UniqueEntityID('servant-id'),
      ),
    )

    const result = await sut.execute({
      servantId: 'servant-id',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantsRepository.items).toHaveLength(1)
  })

  it('should return error when servant not exists', async () => {
    const result = await sut.execute({
      servantId: 'servant-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
