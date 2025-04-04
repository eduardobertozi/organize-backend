import { InMemorySuppliersRepository } from 'test/in-memories/in-memory-suppliers.repository'
import { FetchAllSuppliersUseCase } from './fetch-all-suppliers.use-case'
import { makeSupplier } from 'test/factories/suppliers.factory'

describe('Fetch All Suppliers', () => {
  let inMemorySuppliersRepository: InMemorySuppliersRepository
  let sut: FetchAllSuppliersUseCase

  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    sut = new FetchAllSuppliersUseCase(inMemorySuppliersRepository)
  })

  it('should be able to fetch all suppliers', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemorySuppliersRepository.create(makeSupplier())
    }

    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)
    expect(result.value?.suppliers).toHaveLength(10)
    expect(result.value?.suppliers[0].id).toBeDefined()
  })

  it('should be able to fetch all suppliers by name', async () => {
    await inMemorySuppliersRepository.create(makeSupplier({ name: 'John Doe' }))
    await inMemorySuppliersRepository.create(makeSupplier({ name: 'Jane Doe' }))

    const result = await sut.execute({ q: 'Doe' })

    expect(result.isRight()).toBe(true)
    expect(result.value?.suppliers).toHaveLength(2)
  })

  it('should be able to fetch paginated suppliers', async () => {
    for (let i = 0; i < 10; i++) {
      await inMemorySuppliersRepository.create(makeSupplier())
    }

    const result = await sut.execute({ page: 1 })
    expect(result.isRight()).toBe(true)
    expect(result.value?.suppliers).toHaveLength(10)

    const result2 = await sut.execute({ page: 2 })
    expect(result2.isRight()).toBe(true)
    expect(result2.value?.suppliers).toHaveLength(0)
  })
})
