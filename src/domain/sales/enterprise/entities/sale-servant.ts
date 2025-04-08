import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface SaleServantProps {
  servantId: UniqueEntityID
  saleId: UniqueEntityID
}

export class SaleServant extends Entity<SaleServantProps> {
  get saleId() {
    return this.props.saleId
  }

  get servantId() {
    return this.props.servantId
  }

  static create(props: SaleServantProps, id?: UniqueEntityID) {
    return new SaleServant(props, id)
  }
}
