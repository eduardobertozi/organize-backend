import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { CreateServantUseCase } from './create-servant.use-case'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { makeServant } from 'test/factories/servants.factory'

describe('Create Servant', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let sut: CreateServantUseCase

  beforeEach(() => {
    inMemoryServantsRepository = new InMemoryServantsRepository()
    sut = new CreateServantUseCase(inMemoryServantsRepository)
  })

  it('should be able to create a new servant', async () => {
    const result = await sut.execute({
      name: 'Sample servant',
      productsPrice: 2,
      profitPercent: 48,
      workForcePrice: 25,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantsRepository.items).toHaveLength(1)
    expect(inMemoryServantsRepository.items[0].name).toBe('Sample servant')
    expect(inMemoryServantsRepository.items[0].price).toBe(40)
  })

  it('should not be able create a servant with this already exists', async () => {
    await inMemoryServantsRepository.create(
      makeServant({
        name: 'Sample servant',
      }),
    )

    const result = await sut.execute({
      name: 'Sample servant',
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
