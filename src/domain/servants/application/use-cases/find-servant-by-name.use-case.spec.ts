import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { makeServant } from 'test/factories/servants.factory'
import { FindServantByNameUseCase } from './find-servant-by-name.use-case'

describe('Find Servant By Name', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let sut: FindServantByNameUseCase

  beforeEach(() => {
    inMemoryServantsRepository = new InMemoryServantsRepository()
    sut = new FindServantByNameUseCase(inMemoryServantsRepository)
  })

  it('should be able to find servant by name', async () => {
    const servant = makeServant({
      name: 'Sample servant',
    })

    await inMemoryServantsRepository.create(servant)

    const result = await sut.execute({
      name: 'Sample servant',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toEqual(
      expect.objectContaining({
        servant: expect.objectContaining({
          name: 'Sample servant',
        }),
      }),
    )
  })
})
