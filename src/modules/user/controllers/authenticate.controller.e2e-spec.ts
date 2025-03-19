import { AppModule } from '@/app.module'

import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { hash } from 'bcryptjs'
import request from 'supertest'
import { UsersFactory } from '../test/users.factory'
import { DatabaseUsersModule } from '../database/database-users.module'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let usersFactory: UsersFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseUsersModule],
      providers: [UsersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    usersFactory = moduleRef.get(UsersFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await usersFactory.makePrismaUser({
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
