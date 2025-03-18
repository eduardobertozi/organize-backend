import { Entity } from '@/core/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface ProductProps {
  name: string
  price: number
  reference: string
  supplierId: UniqueEntityID
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  get price() {
    return this.props.price
  }

  set price(value: number) {
    this.props.price = value
  }

  get reference() {
    return this.props.reference
  }

  set reference(reference: string) {
    this.props.reference = reference
  }

  get supplierId() {
    return this.props.supplierId
  }

  set supplierId(supplierId: UniqueEntityID) {
    this.props.supplierId = supplierId
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
    return new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
