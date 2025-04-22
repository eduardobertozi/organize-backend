import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/faker-encrypter'
import { makeUser } from 'test/factories/users.factory'
import { InMemoryUsersRepository } from 'test/in-memories/in-memory-users.repository'
import { AuthenticateUserUseCase } from './authenticate-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a user', async () => {
    const user = makeUser({
      username: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      username: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
