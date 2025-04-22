import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface CustomerProps {
  name: string
  phone?: string | null
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
    return this.props.phone!
  }

  get email(): string {
    return this.props.email!
  }

  get address(): string {
    return this.props.address!
  }

  get city(): string {
    return this.props.city!
  }

  get state(): string {
    return this.props.state!
  }

  get userId(): UniqueEntityID | null {
    return this.props.userId!
  }

  static create(props: CustomerProps, id?: UniqueEntityID) {
    return new Customer(props, id)
  }
}
