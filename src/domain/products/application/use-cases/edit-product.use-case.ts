import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductsRepository } from '../repositories/products.repository'
import { ProductAttachmentsList } from '../../enterprise/entities/product-attachments-list'
import { ProductAttachment } from '../../enterprise/entities/product-attachment'
import { Injectable } from '@nestjs/common'
import { ProductsAttachmentsRepository } from '../repositories/product-attachments.repository'

interface EditProductUseCaseRequest {
  productId: string
  name: string
  price: number
  reference: string
  supplierId: string
  stock: number
  attachmentsIds: string[]
}

type EditProductUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

@Injectable()
export class EditProductUseCase {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productAttachmentsRepository: ProductsAttachmentsRepository,
  ) {}

  async execute(
    params: EditProductUseCaseRequest,
  ): Promise<EditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(
      new UniqueEntityID(params.productId),
    )

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    const existingProduct = await this.productsRepository.findByName(
      params.name,
    )

    if (existingProduct && !existingProduct.id.equals(product.id)) {
      return left(new AlreadyExistsError())
    }

    const currentProductAttachments =
      await this.productAttachmentsRepository.findManyByProductId(
        new UniqueEntityID(params.productId),
      )

    const productAttachmentsList = new ProductAttachmentsList(
      currentProductAttachments,
    )

    const productAttachments = params.attachmentsIds.map((attachmentId) => {
      return ProductAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        productId: product.id,
      })
    })

    productAttachmentsList.update(productAttachments)

    product.name = params.name
    product.price = params.price
    product.reference = params.reference
    product.supplierId = new UniqueEntityID(params.supplierId)
    product.stock = params.stock
    product.attachments = productAttachmentsList

    await this.productsRepository.save(product)

    return right(null)
  }
}
