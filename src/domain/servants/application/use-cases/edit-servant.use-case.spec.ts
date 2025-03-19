import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeServant } from 'test/factories/servant.factory'
import { InMemoryServantRepository } from 'test/in-memories/in-memory-servants.repository'
import { EditServantUseCase } from './edit-servant.use-case'

describe('Edit Servant', () => {
  let inMemoryServantRepository: InMemoryServantRepository
  let sut: EditServantUseCase

  beforeEach(() => {
    inMemoryServantRepository = new InMemoryServantRepository()
    sut = new EditServantUseCase(inMemoryServantRepository)
  })

  it('should be able to edit a existant servant', async () => {
    const servant = makeServant({
      name: 'Sample servant',
    })

    await inMemoryServantRepository.create(servant)

    const result = await sut.execute({
      servantId: servant.id.toString(),
      name: 'Sample servant 2',
      productIds: [],
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryServantRepository.items[0].name).toBe('Sample servant 2')
  })

  it('should not be able edit him when this does not exist', async () => {
    const result = await sut.execute({
      servantId: 'supplier-1',
      name: 'Sample servant',
      productIds: [],
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

    await inMemoryServantRepository.create(servant)

    const result = await sut.execute({
      servantId: servant.id.toString(),
      name: 'Sample servant',
      productIds: [],
      productsPrice: 0,
      profitPercent: 0,
      workForcePrice: 0,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
