import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemorySuppliersRepository } from '../test/in-memory-suppliers.repository'
import { makeSupplier } from '../test/suppliers.factory'
import { DeleteSupplierUseCase } from './delete-supplier.use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

describe('Delete Supplier', () => {
  let inMemorySuppliersRepository: InMemorySuppliersRepository
  let sut: DeleteSupplierUseCase

  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    sut = new DeleteSupplierUseCase(inMemorySuppliersRepository)
  })

  it('should be able to delete a existant supplier', async () => {
    const supplier = makeSupplier({}, new UniqueEntityID('supplier-1'))

    await inMemorySuppliersRepository.create(supplier)

    const result = await sut.execute({
      id: new UniqueEntityID('supplier-1'),
      name: 'John Doe',
      phone: '11999999999',
      email: 'johndoe@example.com',
      address: 'Sample address, 1',
      city: 'Sample city',
      state: 'SP',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySuppliersRepository.items).toHaveLength(0)
  })

  it('should not be able delete him when this does not exist', async () => {
    const result = await sut.execute({
      id: new UniqueEntityID('supplier-1'),
      name: 'John Doe',
      phone: '11999999999',
      email: 'johndoe@example.com',
      address: 'Sample address, 1',
      city: 'Sample city',
      state: 'SP',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
