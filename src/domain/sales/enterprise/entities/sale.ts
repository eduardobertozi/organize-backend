import { UniqueEntityID } from '@/core/unique-entity-id'
import { Entity } from '@/core/entities/entity'

export interface SaleProps {
  description?: string | null
  amount: number

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
    const sale = new Sale(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return sale
  }
}
