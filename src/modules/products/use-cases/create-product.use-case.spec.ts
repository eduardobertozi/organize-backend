import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { CreateProductUseCase } from './create-product.use-case'
import { InMemoryProductsRepository } from '../test/in-memory-products.repository'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { InMemoryProductAttachmentsRepository } from '../test/in-memory-product-attachments.repository'

describe('Create Product', () => {
  let inMemoryProductAttachmentsRepository: InMemoryProductAttachmentsRepository
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: CreateProductUseCase

  beforeEach(() => {
    inMemoryProductAttachmentsRepository =
      new InMemoryProductAttachmentsRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductAttachmentsRepository,
    )
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create a new product', async () => {
    const result = await sut.execute({
      name: 'Sample product',
      price: 0,
      reference: '123',
      supplierId: new UniqueEntityID('123'),
      attachmentsIds: ['1', '2'],
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
      attachmentsIds: ['1', '2'],
    })

    const result = await sut.execute({
      name: 'Sample product',
      price: 0,
      reference: '123',
      supplierId: new UniqueEntityID('123'),
      attachmentsIds: ['1', '2'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })

  it('should be able persist attachments when creation a new product', async () => {
    const result = await sut.execute({
      name: 'Sample product',
      price: 0,
      reference: '123',
      supplierId: new UniqueEntityID('123'),
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items).toHaveLength(1)
    expect(inMemoryProductAttachmentsRepository.items).toHaveLength(2)
    expect(inMemoryProductAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ]),
    )
  })
})
