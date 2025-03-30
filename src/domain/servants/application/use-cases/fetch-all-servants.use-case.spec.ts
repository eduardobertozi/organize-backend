import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { makeServant } from 'test/factories/servants.factory'
import { FetchAllServantsUseCase } from './fetch-all-servants.use-case'

describe('Fetch All Servants', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let sut: FetchAllServantsUseCase

  beforeEach(() => {
    inMemoryServantsRepository = new InMemoryServantsRepository()
    sut = new FetchAllServantsUseCase(inMemoryServantsRepository)
  })

  it('should be able to fetch all servants', async () => {
    for (let i = 0; i < 12; i++) {
      await inMemoryServantsRepository.create(makeServant())
    }

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.servants).toHaveLength(10)
    expect(result.value?.total).toBe(12)
    expect(result.value?.hasMore).toBe(true)
    expect(result.value?.nextPage).toBe(2)
    expect(result.value?.previousPage).toBe(null)

    const result2 = await sut.execute({
      page: 2,
    })

    expect(result2.value?.servants).toHaveLength(2)
    expect(result2.value?.total).toBe(12)
    expect(result2.value?.hasMore).toBe(false)
    expect(result2.value?.nextPage).toBe(null)
    expect(result2.value?.previousPage).toBe(1)
  })
})
