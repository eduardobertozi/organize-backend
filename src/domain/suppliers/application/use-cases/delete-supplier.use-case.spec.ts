import { UniqueEntityID } from '@/core/unique-entity-id'

import { DeleteSupplierUseCase } from './delete-supplier.use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { InMemorySuppliersRepository } from 'test/in-memories/in-memory-suppliers.repository'
import { makeSupplier } from 'test/factories/suppliers.factory'
import { InMemoryProductsRepository } from 'test/in-memories/in-memory-products.repository'
import { makeProduct } from 'test/factories/products.factory'

describe('Delete Supplier', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let inMemorySuppliersRepository: InMemorySuppliersRepository
  let sut: DeleteSupplierUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    sut = new DeleteSupplierUseCase(
      inMemorySuppliersRepository,
      inMemoryProductsRepository,
    )
  })

  it('should be able to delete a existant supplier', async () => {
    const supplier = makeSupplier({}, new UniqueEntityID('supplier-1'))
    await inMemorySuppliersRepository.create(supplier)

    await inMemoryProductsRepository.create(
      makeProduct({ supplierId: supplier.id }),
    )

    const result = await sut.execute({
      supplierId: 'supplier-1',
    })

    const productsOfSuppler = await inMemoryProductsRepository.findBySupplierId(
      supplier.id,
    )

    expect(result.isRight()).toBe(true)
    expect(inMemorySuppliersRepository.items).toHaveLength(0)
    expect(productsOfSuppler).toHaveLength(0)
  })

  it('should not be able delete him when this does not exist', async () => {
    const result = await sut.execute({
      supplierId: 'supplier-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
