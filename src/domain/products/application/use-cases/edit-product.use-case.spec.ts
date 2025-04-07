import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { makeProduct } from 'test/factories/products.factory'
import { InMemoryProductAttachmentsRepository } from 'test/in-memories/in-memory-product-attachments.repository'
import { InMemoryProductsRepository } from 'test/in-memories/in-memory-products.repository'
import { EditProductUseCase } from './edit-product.use-case'
import { makeAttachment } from 'test/factories/attachments.factory'
import { ProductAttachmentsList } from '../../enterprise/entities/product-attachments-list'
import { makeProductAttachment } from 'test/factories/product-attachments.factory'

describe('Edit Product', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let inMemoryProductAttachmentsRepository: InMemoryProductAttachmentsRepository
  let sut: EditProductUseCase

  beforeEach(() => {
    inMemoryProductAttachmentsRepository =
      new InMemoryProductAttachmentsRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductAttachmentsRepository,
    )
    sut = new EditProductUseCase(
      inMemoryProductsRepository,
      inMemoryProductAttachmentsRepository,
    )
  })

  it('should be able to edit a existant product', async () => {
    const product = makeProduct({}, new UniqueEntityID('1'))
    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString(),
      name: 'Sample product 2',
      price: 0,
      reference: '1234',
      supplierId: 'supplier-1',
      stock: 0,
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items[0].name).toBe('Sample product 2')
  })

  it('should not be able edit him when this does not exist', async () => {
    const result = await sut.execute({
      productId: 'product-1',
      name: 'Sample product 2',
      price: 0,
      reference: '1234',
      supplierId: 'supplier-1',
      stock: 0,
      attachmentsIds: ['1', '2'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able edit product with a another existant product name', async () => {
    await inMemoryProductsRepository.create(
      makeProduct({
        name: 'Sample product',
      }),
    )

    const product = makeProduct({
      name: 'Sample product 2',
    })

    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString(),
      name: 'Sample product',
      price: 0,
      reference: '1234',
      supplierId: 'supplier-1',
      stock: 0,
      attachmentsIds: ['1', '2'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })

  it('should be able persist original attachments if no new ones are provided', async () => {
    const attachment = makeAttachment({}, new UniqueEntityID('attachment-1'))

    const product = makeProduct({
      name: 'Sample product',
    })

    const productAttachment = makeProductAttachment({
      attachmentId: attachment.id,
      productId: product.id,
    })

    product.attachments = new ProductAttachmentsList([productAttachment])

    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString(),
      name: 'Sample product 2',
      price: 0,
      reference: '1234',
      supplierId: 'supplier-1',
      stock: 0,
      attachmentsIds: [],
    })

    if (result.isRight()) {
      const createdAttachment = result.value.product.attachments
        .getItems()[0]
        .attachmentId.toString()

      expect(createdAttachment).toEqual(attachment.id.toString())
    }
  })
})
