import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductsRepository } from '../repositories/products.repository'
import { ProductAttachmentsRepository } from '../repositories/product-attachments.repository'
import { ProductAttachmentsList } from '../../enterprise/entities/product-attachments-list'
import { ProductAttachment } from '../../enterprise/entities/product-attachment'

interface EditProductUseCaseRequest {
  productId: string
  name: string
  price: number
  reference: string
  supplierId: string
  attachmentsIds: string[]
}

type EditProductUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

export class EditProductUseCase {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productAttachmentsRepository: ProductAttachmentsRepository,
  ) {}

  async execute(
    params: EditProductUseCaseRequest,
  ): Promise<EditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(params.productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    const newNameBelongsToAnotherExistandProduct =
      await this.productsRepository.findByName(params.name)

    if (newNameBelongsToAnotherExistandProduct.length > 0) {
      return left(new AlreadyExistsError())
    }

    const currentProductAttachments =
      await this.productAttachmentsRepository.findManyByProductId(
        params.productId,
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

    await this.productsRepository.save(product)

    return right(null)
  }
}
