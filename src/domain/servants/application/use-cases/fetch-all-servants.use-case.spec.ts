import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { makeServant } from 'test/factories/servants.factory'
import { FetchAllServantsUseCase } from './fetch-all-servants.use-case'
import { Servant } from '../../enterprise/entities/servant'

describe('Fetch All Servants', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let sut: FetchAllServantsUseCase

  beforeEach(() => {
    inMemoryServantsRepository = new InMemoryServantsRepository()
    sut = new FetchAllServantsUseCase(inMemoryServantsRepository)
  })

  it('should be able to fetch all servants', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryServantsRepository.create(makeServant())
    }

    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)
    expect(result.value?.servants).toHaveLength(10)
    expect(result.value?.servants[0].id).toBeDefined()
  })

  it('should be able to fetch all servants with ten items per page', async () => {
    const createServants: Promise<Servant>[] = []

    for (let i = 0; i < 12; i++) {
      createServants.push(inMemoryServantsRepository.create(makeServant()))
    }

    await Promise.all(createServants)

    const result1 = await sut.execute({
      page: 1,
    })

    expect(result1.isRight()).toBe(true)
    expect(result1.value?.servants).toHaveLength(10)

    const result2 = await sut.execute({
      page: 2,
    })

    expect(result2.isRight()).toBe(true)
    expect(result2.value?.servants).toHaveLength(2)
  })
})
