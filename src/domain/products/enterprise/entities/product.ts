import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { ProductAttachmentsList } from './product-attachments-list'

export interface ProductProps {
  name: string
  price: number
  reference: string
  attachments: ProductAttachmentsList
  supplierId?: UniqueEntityID
  createdAt?: Date
  updatedAt?: Date | null
}

export class Product extends AggregateRoot<ProductProps> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get price() {
    return this.props.price
  }

  set price(value: number) {
    this.props.price = value
    this.touch()
  }

  get reference() {
    return this.props.reference
  }

  set reference(reference: string) {
    this.props.reference = reference
    this.touch()
  }

  get supplierId() {
    return this.props.supplierId!
  }

  set supplierId(supplierId: UniqueEntityID) {
    this.props.supplierId = supplierId
    this.touch()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: ProductAttachmentsList) {
    this.props.attachments = attachments
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: ProductProps, id?: UniqueEntityID): Product {
    const product = new Product(
      {
        ...props,
        supplierId: props.supplierId ?? new UniqueEntityID(),
        attachments: props.attachments ?? new ProductAttachmentsList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return product
  }
}
