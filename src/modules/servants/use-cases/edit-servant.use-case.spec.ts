import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemoryServantRepository } from '../test/in-memory-servants.repository'
import { makeServant } from '../test/servant.factory'
import { EditServantUseCase } from './edit-servant.use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'

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
      id: servant.id,
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
      id: new UniqueEntityID('123456'),
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
      id: servant.id,
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
