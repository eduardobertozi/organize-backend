import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { SaleServantsFactory } from 'test/factories/sale-servants.factory'
import { SalesFactory } from 'test/factories/sales.factory'
import { ServantsFactory } from 'test/factories/servants.factory'
import { UsersFactory } from 'test/factories/users.factory'

describe('Create Sale Servant (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let usersFactory: UsersFactory
  let servantsFactory: ServantsFactory
  let salesFactory: SalesFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UsersFactory,
        ServantsFactory,
        SalesFactory,
        SaleServantsFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    usersFactory = moduleRef.get(UsersFactory)
    servantsFactory = moduleRef.get(ServantsFactory)
    salesFactory = moduleRef.get(SalesFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /sale-servants', async () => {
    const user = await usersFactory.makePrismaUser()
    const access_token = jwt.sign({ sub: user.id.toString() })

    const servant = await servantsFactory.makePrismaServant()
    const sale = await salesFactory.makePrismaSale()

    const response = await request(app.getHttpServer())
      .post('/sale-servants')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        servantId: servant.id.toString(),
        saleId: sale.id.toString(),
      })

    expect(response.statusCode).toBe(201)

    const saleServant = response.body.saleServant

    expect(saleServant).toEqual(
      expect.objectContaining({
        id: saleServant.id,
      }),
    )

    const saleServantsOnDatabase = await prisma.saleServants.findFirst({
      where: {
        saleId: sale.id.toString(),
      },
    })

    expect(saleServantsOnDatabase).toBeTruthy()
  })
})
