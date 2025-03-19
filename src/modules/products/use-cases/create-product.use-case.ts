import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ProductsRepository } from '../repositories/products.repository'
import { Product } from '../entities/product'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductAttachment } from '../entities/product-attachment'
import { ProductAttachmentsList } from '../entities/product-attachments-list'

interface CreateProductUseCaseRequest {
  name: string
  price: number
  reference: string
  supplierId: UniqueEntityID
  attachmentsIds: string[]
}

type CreateProductUseCaseResponse = Either<AlreadyExistsError, null>

export class CreateProductUseCase {
  constructor(private readonly servantRepository: ProductsRepository) {}

  async execute(
    params: CreateProductUseCaseRequest,
  ): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({
      name: params.name,
      price: params.price,
      reference: params.reference,
      supplierId: params.supplierId,
      attachments: new ProductAttachmentsList(),
    })

    const productAttachments = params.attachmentsIds.map((attachmentId) => {
      return ProductAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        productId: product.id,
      })
    })

    product.attachments = new ProductAttachmentsList(productAttachments)

    const servantExists = await this.servantRepository.findByName(product.name)

    if (!servantExists || servantExists.length > 0) {
      return left(new AlreadyExistsError())
    }

    await this.servantRepository.create(product)

    return right(null)
  }
}
