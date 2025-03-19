import { InMemorySuppliersRepository } from '../test/in-memory-suppliers.repository'
import { makeSupplier } from '../test/suppliers.factory'
import { FetchAllSuppliersUseCase } from './fetch-all-suppliers.use-case'

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

  it('should be able to fetch all suppliers with ten items per page', async () => {
    const createSuppliers: Promise<void>[] = []

    for (let i = 0; i < 12; i++) {
      createSuppliers.push(inMemorySuppliersRepository.create(makeSupplier()))
    }

    await Promise.all(createSuppliers)

    const result1 = await sut.execute({
      page: 1,
    })

    expect(result1.isRight()).toBe(true)
    expect(result1.value?.suppliers).toHaveLength(10)

    const result2 = await sut.execute({
      page: 2,
    })

    expect(result2.isRight()).toBe(true)
    expect(result2.value?.suppliers).toHaveLength(2)
  })
})
