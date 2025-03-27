import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { makeServant } from 'test/factories/servants.factory'
import { FindServantByNameUseCase } from './find-servant-by-name.use-case'
import { Servant } from '../../enterprise/entities/servant'

describe('Find Servant By Name', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let sut: FindServantByNameUseCase

  beforeEach(() => {
    inMemoryServantsRepository = new InMemoryServantsRepository()
    sut = new FindServantByNameUseCase(inMemoryServantsRepository)
  })

  it('should be able to find servants by name', async () => {
    const servant = makeServant({
      name: 'Sample servant',
    })

    await inMemoryServantsRepository.create(servant)

    const result = await sut.execute({
      name: 'Sample servant',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantsRepository.items).toHaveLength(1)
  })

  it('should be able to find for several servants with similar name', async () => {
    await Promise.all([
      inMemoryServantsRepository.create(
        makeServant({
          name: 'Sample servant',
        }),
      ),
      inMemoryServantsRepository.create(
        makeServant({
          name: 'Sample servant 2',
        }),
      ),
      inMemoryServantsRepository.create(
        makeServant({
          name: 'Sample servant 3',
        }),
      ),
    ])

    const result = await sut.execute({
      name: 'Sample servant',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantsRepository.items).toHaveLength(3)
  })

  it('should be able to find paginated servants', async () => {
    const tasks: Promise<Servant>[] = []

    for (let i = 0; i < 12; i++) {
      tasks.push(
        inMemoryServantsRepository.create(
          makeServant({
            name: `Sample servant ${i}`,
          }),
        ),
      )
    }

    await Promise.all(tasks)

    const result = await sut.execute({
      name: 'Sample servant',
      page: 2,
    })

    expect(result.isRight()).toBe(true)

    expect(result.value?.servants).toHaveLength(2)
  })
})
