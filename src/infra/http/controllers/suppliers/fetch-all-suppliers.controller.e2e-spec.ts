import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { SuppliersFactory } from 'test/factories/suppliers.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Fetch All Suppliers (E2E)', () => {
  let app: INestApplication
  let usersFactory: UsersFactory
  let suppliersFactory: SuppliersFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersFactory, SuppliersFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    usersFactory = moduleRef.get(UsersFactory)
    suppliersFactory = moduleRef.get(SuppliersFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /suppliers/:suppliersId', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    await Promise.all(
      Array.from({ length: 12 }, () => suppliersFactory.makePrismaSuppliers()),
    )

    const response = await request(app.getHttpServer())
      .get('/suppliers?page=1')
      .set('Authorization', `Bearer ${access_token}`)
      .send({})

    expect(response.statusCode).toBe(200)
    expect(response.body.suppliers).toBeTruthy()
    expect(response.body.suppliers).toHaveLength(10)

    const response2 = await request(app.getHttpServer())
      .get('/suppliers?page=2')
      .set('Authorization', `Bearer ${access_token}`)
      .send({})

    expect(response2.statusCode).toBe(200)
    expect(response2.body.suppliers).toBeTruthy()
    expect(response2.body.suppliers).toHaveLength(2)
  })
})
