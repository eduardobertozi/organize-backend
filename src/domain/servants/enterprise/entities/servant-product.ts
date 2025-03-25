import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface ServantProductProps {
  servantId: string
  productId: string
}

export class ServantProduct extends Entity<ServantProductProps> {
  get servantId(): string {
    return this.props.servantId
  }

  get productId(): string {
    return this.props.productId
  }

  static create(
    props: ServantProductProps,
    id?: UniqueEntityID,
  ): ServantProduct {
    return new ServantProduct(props, id)
  }
}
