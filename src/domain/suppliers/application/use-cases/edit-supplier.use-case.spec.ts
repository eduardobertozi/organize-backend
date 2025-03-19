import { UniqueEntityID } from '@/core/unique-entity-id'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeSupplier } from 'test/factories/suppliers.factory'
import { InMemorySuppliersRepository } from 'test/in-memories/in-memory-suppliers.repository'
import { EditSupplierUseCase } from './edit-supplier.use-case'

describe('Edit Supplier', () => {
  let inMemorySuppliersRepository: InMemorySuppliersRepository
  let sut: EditSupplierUseCase

  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    sut = new EditSupplierUseCase(inMemorySuppliersRepository)
  })

  it('should be able to edit a existant supplier', async () => {
    const supplier = makeSupplier({
      name: 'John Doe',
    })

    await inMemorySuppliersRepository.create(supplier)

    const result = await sut.execute({
      supplierId: supplier.id.toString(),
      name: 'John Doe 2',
      phone: '11999999999',
      email: 'johndoe@example.com',
      address: 'Sample address, 1',
      city: 'Sample city',
      state: 'SP',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySuppliersRepository.items[0].name).toBe('John Doe 2')
  })

  it('should not be able edit him when this does not exist', async () => {
    const result = await sut.execute({
      supplierId: 'supplier-1',
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

  it('should not be able edit supplier with a another existant supplier name', async () => {
    await inMemorySuppliersRepository.create(
      makeSupplier({
        name: 'John Doe',
      }),
    )

    await inMemorySuppliersRepository.create(
      makeSupplier({}, new UniqueEntityID('supplier-1')),
    )

    const result = await sut.execute({
      supplierId: 'supplier-1',
      name: 'John Doe',
      phone: '11999999999',
      email: 'johndoe@example.com',
      address: 'Sample address, 1',
      city: 'Sample city',
      state: 'SP',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
