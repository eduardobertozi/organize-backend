import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemoryServantRepository } from 'test/in-memories/in-memory-servants.repository'
import { makeServant } from 'test/factories/servant.factory'
import { FindServantByIdUseCase } from './find-servant-by-id.use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

describe('Find Servant By Id', () => {
  let inMemoryServantRepository: InMemoryServantRepository
  let sut: FindServantByIdUseCase

  beforeEach(() => {
    inMemoryServantRepository = new InMemoryServantRepository()
    sut = new FindServantByIdUseCase(inMemoryServantRepository)
  })

  it('should be able to find servant by id', async () => {
    await inMemoryServantRepository.create(
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
    expect(inMemoryServantRepository.items).toHaveLength(1)
  })

  it('should return error when servant not exists', async () => {
    const result = await sut.execute({
      servantId: 'servant-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
