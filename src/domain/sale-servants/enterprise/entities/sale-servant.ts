import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface SaleServantProps {
  saleId: string
  servantId: string
}

export class SaleServant extends Entity<SaleServantProps> {
  get saleId(): string {
    return this.props.saleId
  }

  get servantId(): string {
    return this.props.servantId
  }

  static create(props: SaleServantProps, id?: UniqueEntityID): SaleServant {
    return new SaleServant(props, id)
  }
}
