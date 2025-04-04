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

    if (result.isRight()) {
      expect(result.value.supplier).toBeTruthy()
    }
  })
})
