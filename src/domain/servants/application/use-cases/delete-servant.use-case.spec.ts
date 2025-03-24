import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { makeServant } from 'test/factories/servants.factory'
import { DeleteServantUseCase } from './delete-servant.use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

describe('Delete Servant', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let sut: DeleteServantUseCase

  beforeEach(() => {
    inMemoryServantsRepository = new InMemoryServantsRepository()
    sut = new DeleteServantUseCase(inMemoryServantsRepository)
  })

  it('should be able to delete a existant servant', async () => {
    const servant = makeServant({}, new UniqueEntityID('servant-1'))

    await inMemoryServantsRepository.create(servant)

    const result = await sut.execute({
      servantId: 'servant-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantsRepository.items).toHaveLength(0)
  })

  it('should not be able delete him when this does not exist', async () => {
    const result = await sut.execute({
      servantId: 'servant-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
