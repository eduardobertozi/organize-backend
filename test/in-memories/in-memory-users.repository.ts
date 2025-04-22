import { User } from '../../src/domain/user/enterprise/entities/user'
import { UsersRepository } from '../../src/domain/user/application/repositories/users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  findByUsername(username: string): Promise<User | null> {
    const user = this.items.find((user) => user.username === username)
    return Promise.resolve(user || null)
  }

  create(user: User): Promise<void> {
    this.items.push(user)
    return Promise.resolve()
  }
}
