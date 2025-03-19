import { InMemorySuppliersRepository } from 'test/in-memories/in-memory-suppliers.repository'
import { FindSupplierByNameUseCase } from './find-supplier-by-name.use-case'
import { makeSupplier } from 'test/factories/suppliers.factory'

describe('Find Supplier By Name', () => {
  let inMemorySuppliersRepository: InMemorySuppliersRepository
  let sut: FindSupplierByNameUseCase

  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    sut = new FindSupplierByNameUseCase(inMemorySuppliersRepository)
  })

  it('should be able to find suppliers by name', async () => {
    const supplier = makeSupplier({
      name: 'Sample supplier',
    })

    await inMemorySuppliersRepository.create(supplier)

    const result = await sut.execute({
      name: 'Sample supplier',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySuppliersRepository.items).toHaveLength(1)
  })

  it('should be able to find for several suppliers with similar name', async () => {
    await Promise.all([
      inMemorySuppliersRepository.create(
        makeSupplier({
          name: 'Sample supplier',
        }),
      ),
      inMemorySuppliersRepository.create(
        makeSupplier({
          name: 'Sample supplier 2',
        }),
      ),
      inMemorySuppliersRepository.create(
        makeSupplier({
          name: 'Sample supplier 3',
        }),
      ),
    ])

    const result = await sut.execute({
      name: 'Sample supplier',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySuppliersRepository.items).toHaveLength(3)
  })

  it('should be able to find paginated suppliers', async () => {
    const tasks: Promise<void>[] = []

    for (let i = 0; i < 12; i++) {
      tasks.push(
        inMemorySuppliersRepository.create(
          makeSupplier({
            name: `Sample supplier ${i}`,
          }),
        ),
      )
    }

    await Promise.all(tasks)

    const result = await sut.execute({
      name: 'Sample supplier',
      page: 2,
    })

    expect(result.isRight()).toBe(true)

    expect(result.value?.suppliers).toHaveLength(2)
  })
})
