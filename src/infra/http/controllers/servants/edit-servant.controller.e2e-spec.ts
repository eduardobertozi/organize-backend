import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ServantsFactory } from 'test/factories/servants.factory'
import { SuppliersFactory } from 'test/factories/suppliers.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Edit Servant (E2E)', () => {
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

  test('[PUT] /servants/:servantId', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })
    const servant = await servantsFactory.makePrismaServant()

    const response = await request(app.getHttpServer())
      .put(`/servants/${servant.id.toString()}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'New Servant Name',
        productsPrice: servant.productsPrice,
        workForcePrice: servant.workForcePrice,
        profitPercent: servant.productsPrice,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.servant).toBeTruthy()
    expect(response.body.servant).toEqual(
      expect.objectContaining({
        id: servant.id.toString(),
        name: 'New Servant Name',
      }),
    )
  })
})
