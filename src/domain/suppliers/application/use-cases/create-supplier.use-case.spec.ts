import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { CreateSupplierUseCase } from './create-supplier.use-case'
import { InMemorySuppliersRepository } from 'test/in-memories/in-memory-suppliers.repository'
import { makeSupplier } from 'test/factories/suppliers.factory'

describe('Create Supplier', () => {
  let inMemorySuppliersRepository: InMemorySuppliersRepository
  let sut: CreateSupplierUseCase

  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    sut = new CreateSupplierUseCase(inMemorySuppliersRepository)
  })

  it('should be able to create a new supplier', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      phone: '11999999999',
      email: 'johndoe@example.com',
      address: 'Sample address, 1',
      city: 'Sample city',
      state: 'SP',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySuppliersRepository.items).toHaveLength(1)
    expect(inMemorySuppliersRepository.items[0].name).toBe('John Doe')
  })

  it('should not be able create a supplier with this already exists', async () => {
    await inMemorySuppliersRepository.create(
      makeSupplier({
        name: 'John Doe',
      }),
    )

    const result = await sut.execute({
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
