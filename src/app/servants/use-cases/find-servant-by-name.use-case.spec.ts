import { InMemoryServantRepository } from '../test/in-memory-servants.repository'
import { makeServant } from '../test/servant.factory'
import { FindServantByNameUseCase } from './find-servant-by-name.use-case'

describe('Find Servant By Name', () => {
  let inMemoryServantRepository: InMemoryServantRepository
  let sut: FindServantByNameUseCase

  beforeEach(() => {
    inMemoryServantRepository = new InMemoryServantRepository()
    sut = new FindServantByNameUseCase(inMemoryServantRepository)
  })

  it('should be able to find servants by name', async () => {
    const servant = makeServant({
      name: 'Sample servant',
    })

    await inMemoryServantRepository.create(servant)

    const result = await sut.execute({
      name: 'Sample servant',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantRepository.items).toHaveLength(1)
  })

  it('should be able to find for several servants with similar name', async () => {
    await Promise.all([
      inMemoryServantRepository.create(
        makeServant({
          name: 'Sample servant',
        }),
      ),
      inMemoryServantRepository.create(
        makeServant({
          name: 'Sample servant 2',
        }),
      ),
      inMemoryServantRepository.create(
        makeServant({
          name: 'Sample servant 3',
        }),
      ),
    ])

    const result = await sut.execute({
      name: 'Sample servant',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantRepository.items).toHaveLength(3)
  })

  it('should be able to find paginated servants', async () => {
    const tasks: Promise<void>[] = []

    for (let i = 0; i < 12; i++) {
      tasks.push(
        inMemoryServantRepository.create(
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
