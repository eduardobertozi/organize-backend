import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ProductsRepository } from '../repositories/products.repository'
import { Product } from '../../enterprise/entities/product'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductAttachment } from '../../enterprise/entities/product-attachment'
import { ProductAttachmentsList } from '../../enterprise/entities/product-attachments-list'
import { Injectable } from '@nestjs/common'

interface CreateProductUseCaseRequest {
  name: string
  price: number
  reference: string
  supplierId: string
  stock: number
  attachmentsIds: string[]
}

type CreateProductUseCaseResponse = Either<AlreadyExistsError, null>

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    params: CreateProductUseCaseRequest,
  ): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({
      name: params.name,
      price: params.price,
      reference: params.reference,
      supplierId: new UniqueEntityID(params.supplierId),
      stock: params.stock,
      attachments: new ProductAttachmentsList(),
    })

    const productAttachments = params.attachmentsIds.map((attachmentId) => {
      return ProductAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        productId: product.id,
      })
    })

    product.attachments = new ProductAttachmentsList(productAttachments)

    const productExists = await this.productsRepository.findByName(product.name)

    if (productExists) {
      return left(new AlreadyExistsError())
    }

    await this.productsRepository.create(product)

    return right(null)
  }
}
