import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface ProductAttachmentProps {
  attachmentId: UniqueEntityID
  productId: UniqueEntityID
}

export class ProductAttachment extends Entity<ProductAttachmentProps> {
  get productId() {
    return this.props.productId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: ProductAttachmentProps, id?: UniqueEntityID) {
    return new ProductAttachment(props, id)
  }
}
