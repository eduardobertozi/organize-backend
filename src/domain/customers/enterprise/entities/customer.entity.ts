import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface CustomerProps {
  name: string
  phone: string
  email?: string | null
  address?: string | null
  city?: string | null
  state?: string | null
  userId?: UniqueEntityID | null
}

export class Customer extends Entity<CustomerProps> {
  get name(): string {
    return this.props.name
  }

  get phone(): string {
    return this.props.phone
  }

  get userId(): UniqueEntityID | null {
    return this.props.userId!
  }

  static create(props: CustomerProps, id?: UniqueEntityID) {
    return new Customer(props, id)
  }
}
