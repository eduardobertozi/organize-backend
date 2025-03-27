import { Entity } from '@/core/entities/entity'
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
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  get city() {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
    this.touch()
  }

  get state() {
    return this.props.state
  }

  set state(state: string) {
    this.props.state = state
    this.touch()
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt!
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
    this.touch()
  }

  get updatedAt() {
    return this.props.updatedAt!
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
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
