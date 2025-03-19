import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemorySuppliersRepository } from '../test/in-memory-suppliers.repository'
import { makeSupplier } from '../test/suppliers.factory'
import { FindSupplierByIdUseCase } from './find-supplier-by-id.use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

describe('Find Supplier By Id', () => {
  let inMemorySuppliersRepository: InMemorySuppliersRepository
  let sut: FindSupplierByIdUseCase

  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    sut = new FindSupplierByIdUseCase(inMemorySuppliersRepository)
  })

  it('should be able to find supplier by id', async () => {
    const supplier = makeSupplier(
      {
        name: 'Sample supplier',
      },
      new UniqueEntityID('123456'),
    )

    await inMemorySuppliersRepository.create(supplier)

    const result = await sut.execute({
      id: new UniqueEntityID('123456'),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySuppliersRepository.items).toHaveLength(1)
  })

  it('should return error when supplier not exists', async () => {
    const result = await sut.execute({
      id: new UniqueEntityID('123456'),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
