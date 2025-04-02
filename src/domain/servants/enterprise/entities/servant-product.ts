import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface ServantProductProps {
  productId: UniqueEntityID
  servantId: UniqueEntityID
}

export class ServantProduct extends Entity<ServantProductProps> {
  get productId() {
    return this.props.productId
  }

  get servantId() {
    return this.props.servantId
  }

  static create(props: ServantProductProps, id?: UniqueEntityID) {
    return new ServantProduct(props, id)
  }
}
