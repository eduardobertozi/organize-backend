import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CustomersFactory } from 'test/factories/customers.factory'

describe('Fetch Customers (E2E)', () => {
  let app: INestApplication
  let customersFactory: CustomersFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CustomersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    customersFactory = moduleRef.get(CustomersFactory)

    await app.init()
  })

  test('[GET] /customers', async () => {
    await customersFactory.makePrismaCustomer({
      name: 'John Doe',
    })

    const response = await request(app.getHttpServer())
      .get('/customers?page=1')
      .send({})

    expect(response.statusCode).toBe(200)
    expect(response.body.customers).toHaveLength(1)
  })
})
