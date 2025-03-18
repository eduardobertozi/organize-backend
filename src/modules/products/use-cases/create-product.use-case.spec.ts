import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { CreateProductUseCase } from './create-product.use-case'
import { InMemoryProductsRepository } from '../test/in-memory-products.repository'
import { UniqueEntityID } from '@/core/unique-entity-id'

describe('Create Product', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: CreateProductUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create a new product', async () => {
    const result = await sut.execute({
      name: 'Sample product',
      price: 0,
      reference: '123',
      supplierId: new UniqueEntityID('123'),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items).toHaveLength(1)
    expect(inMemoryProductsRepository.items[0].name).toBe('Sample product')
  })

  it('should not be able create a product with this already exists', async () => {
    await sut.execute({
      name: 'Sample product',
      price: 0,
      reference: '123',
      supplierId: new UniqueEntityID('123'),
    })

    const result = await sut.execute({
      name: 'Sample product',
      price: 0,
      reference: '123',
      supplierId: new UniqueEntityID('123'),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
