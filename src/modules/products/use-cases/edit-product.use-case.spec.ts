import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemoryProductsRepository } from '../test/in-memory-products.repository'
import { makeProduct } from '../test/products.factory'
import { EditProductUseCase } from './edit-product.use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'

describe('Edit Product', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: EditProductUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new EditProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to edit a existant product', async () => {
    const product = makeProduct({}, new UniqueEntityID('1'))
    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      id: new UniqueEntityID('1'),
      name: 'Sample product 2',
      price: 0,
      reference: '1234',
      supplierId: new UniqueEntityID('supplier-1'),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items[0].name).toBe('Sample product 2')
  })

  it('should not be able edit him when this does not exist', async () => {
    const result = await sut.execute({
      id: new UniqueEntityID('1'),
      name: 'Sample product',
      price: 0,
      reference: '1234',
      supplierId: new UniqueEntityID('1'),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able edit product with a another existant product name', async () => {
    const product = makeProduct({
      name: 'Sample product',
    })

    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      id: product.id,
      name: 'Sample product',
      price: 0,
      reference: '1234',
      supplierId: new UniqueEntityID('1'),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
