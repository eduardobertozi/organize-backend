import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CustomersFactory } from 'test/factories/customers.factory'
import { SalesFactory } from 'test/factories/sales.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Edit Sale (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let customersFactory: CustomersFactory
  let salesFactory: SalesFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory, SalesFactory, CustomersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    customersFactory = moduleRef.get(CustomersFactory)
    salesFactory = moduleRef.get(SalesFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /sales/:saleId', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })
    const customer = await customersFactory.makePrismaCustomer()

    const sale = await salesFactory.makePrismaSale({
      customerId: customer.id,
      employeeId: user.id,
    })

    const response = await request(app.getHttpServer())
      .put(`/sales/${sale.id.toString()}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        description: 'New Description',
        amount: 100,
        servants: [],
        customerId: customer.id.toString(),
      })

    expect(response.statusCode).toBe(204)

    const salesOnDatabase = await prisma.sale.findFirst({
      where: {
        id: sale.id.toString(),
      },
    })

    expect(salesOnDatabase).toBeTruthy()
    expect(salesOnDatabase?.amount).toEqual(100)
    expect(salesOnDatabase?.description).toEqual('New Description')
  })
})
