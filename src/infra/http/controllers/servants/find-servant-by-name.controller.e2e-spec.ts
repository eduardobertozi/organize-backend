import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ServantsFactory } from 'test/factories/servants.factory'
import { SuppliersFactory } from 'test/factories/suppliers.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Find Servant By Name (E2E)', () => {
  let app: INestApplication
  let usersFactory: UsersFactory
  let servantsFactory: ServantsFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory, ServantsFactory, SuppliersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    usersFactory = moduleRef.get(UsersFactory)
    servantsFactory = moduleRef.get(ServantsFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /servants', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    await Promise.all(
      Array.from({ length: 12 }).map((_v, i) =>
        servantsFactory.makePrismaServant({
          name: `Servant ${i}`,
        }),
      ),
    )

    const response = await request(app.getHttpServer())
      .get('/servants?page=1&name=Servant 1')
      .set('Authorization', `Bearer ${access_token}`)
      .send({})

    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        servants: expect.any(Array),
      }),
    )

    expect(response.body.servants).toHaveLength(1)
  })
})
