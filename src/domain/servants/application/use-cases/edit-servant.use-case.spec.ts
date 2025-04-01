import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeServant } from 'test/factories/servants.factory'
import { InMemoryServantsRepository } from 'test/in-memories/in-memory-servants.repository'
import { EditServantUseCase } from './edit-servant.use-case'

describe('Edit Servant', () => {
  let inMemoryServantsRepository: InMemoryServantsRepository
  let sut: EditServantUseCase

  beforeEach(() => {
    inMemoryServantsRepository = new InMemoryServantsRepository()
    sut = new EditServantUseCase(inMemoryServantsRepository)
  })

  it('should be able to edit a existant servant', async () => {
    const servant = makeServant({
      name: 'Sample servant',
    })

    await inMemoryServantsRepository.create(servant)

    const result = await sut.execute({
      servantId: servant.id.toString(),
      name: 'Sample servant 2',
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantsRepository.items[0].name).toBe('Sample servant 2')
  })

  it('should not be able edit him when this does not exist', async () => {
    const result = await sut.execute({
      servantId: 'supplier-1',
      name: 'Sample servant',
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able edit servant with a another existant servant name', async () => {
    const servant = makeServant({
      name: 'Sample servant',
    })

    await inMemoryServantsRepository.create(servant)

    await inMemoryServantsRepository.create(
      makeServant({
        name: 'Sample servant 2',
      }),
    )

    const result = await sut.execute({
      servantId: servant.id.toString(),
      name: 'Sample servant 2',
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
