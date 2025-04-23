import { UniqueEntityID } from '@/core/unique-entity-id'
import { Entity } from '@/core/entities/entity'
import { SaleServantList } from './sale-servant-list'

export interface SaleProps {
  description?: string | null
  amount: number
  servants: SaleServantList
  customerId: UniqueEntityID
  employeeId: UniqueEntityID
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Sale extends Entity<SaleProps> {
  get amount() {
    return this.props.amount
  }

  set amount(amount: number) {
    this.props.amount = amount
    this.touch()
  }

  get description() {
    return this.props.description ?? ''
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get servants(): SaleServantList {
    return this.props.servants
  }

  set servants(servants: SaleServantList) {
    this.props.servants = servants
    this.touch()
  }

  get customerId(): UniqueEntityID {
    return this.props.customerId
  }

  get employeeId(): UniqueEntityID {
    return this.props.employeeId
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

  static create(props: SaleProps, id?: UniqueEntityID): Sale {
    return new Sale(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
