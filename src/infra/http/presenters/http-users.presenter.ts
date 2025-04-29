import { User } from '@/domain/user/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      username: user.username,
      password: user.password,
    }
  }
}
