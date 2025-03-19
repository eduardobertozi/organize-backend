import { Entity } from '@/core/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface SupplierProps {
  name: string
  email: string
  phone: string
  city: string
  state: string
  address: string
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Supplier extends Entity<SupplierProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get city() {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
  }

  get state() {
    return this.props.state
  }

  set state(state: string) {
    this.props.state = state
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
  }

  public static create(props: SupplierProps, id?: UniqueEntityID) {
    return new Supplier(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
