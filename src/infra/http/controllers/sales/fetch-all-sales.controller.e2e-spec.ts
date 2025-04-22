import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { SalesFactory } from 'test/factories/sales.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Fetch all Sales (E2E)', () => {
  let app: INestApplication
  let usersFactory: UsersFactory
  let salesFactory: SalesFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory, SalesFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    usersFactory = moduleRef.get(UsersFactory)
    salesFactory = moduleRef.get(SalesFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /sales/all', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    await Promise.all(
      Array.from({ length: 12 }).map(() => salesFactory.makePrismaSale()),
    )

    const response = await request(app.getHttpServer())
      .get('/sales/all?page=1')
      .set('Authorization', `Bearer ${access_token}`)
      .send({})

    expect(response.statusCode).toBe(200)
    expect(response.body.sales).toBeTruthy()
    expect(response.body.sales).toHaveLength(10)

    const response2 = await request(app.getHttpServer())
      .get('/sales/all?page=2')
      .set('Authorization', `Bearer ${access_token}`)
      .send({})

    expect(response2.statusCode).toBe(200)
    expect(response2.body.sales).toBeTruthy()
    expect(response2.body.sales).toHaveLength(2)
  })
})
