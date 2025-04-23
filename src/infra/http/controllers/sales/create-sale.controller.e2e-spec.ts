import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CustomersFactory } from 'test/factories/customers.factory'
import { ServantsFactory } from 'test/factories/servants.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Create Sale (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let customersFactory: CustomersFactory
  let servantsFactory: ServantsFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory, ServantsFactory, CustomersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    customersFactory = moduleRef.get(CustomersFactory)
    servantsFactory = moduleRef.get(ServantsFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /sales', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })
    const servant = await servantsFactory.makePrismaServant()
    const customer = await customersFactory.makePrismaCustomer()

    const response = await request(app.getHttpServer())
      .post('/sales')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        description: 'New Sale',
        amount: servant.price,
        servants: [],
        customerId: customer.id.toString(),
      })

    expect(response.statusCode).toBe(201)

    const sale = response.body.sale

    expect(sale).toEqual(
      expect.objectContaining({
        id: sale.id,
        description: 'New Sale',
      }),
    )

    const salesOnDatabase = await prisma.sale.findFirst({
      where: {
        id: sale.id,
      },
    })

    expect(salesOnDatabase).toBeTruthy()
  })
})
