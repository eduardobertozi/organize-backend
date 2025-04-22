import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface UserProps {
  name: string
  username: string
  password: string
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get username() {
    return this.props.username
  }

  get password() {
    return this.props.password
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const question = new User(props, id)

    return question
  }
}
