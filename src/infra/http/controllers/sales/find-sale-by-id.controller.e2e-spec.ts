import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { SalesFactory } from 'test/factories/sales.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Find sale by id (E2E)', () => {
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

  test('[GET] /sales/:saleId', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    const customer = await usersFactory.makePrismaUser()

    const sale = await salesFactory.makePrismaSale({
      customerId: customer.id,
      employeeId: user.id,
    })

    const response = await request(app.getHttpServer())
      .get(`/sales/${sale.id.toString()}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({})

    expect(response.statusCode).toBe(200)
    expect(response.body.sale).toBeTruthy()
    expect(response.body.sale).toEqual(
      expect.objectContaining({
        id: sale.id.toString(),
      }),
    )
  })
})
